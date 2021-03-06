def getServerEnvironmentList(){
  return ['DEV', 'SIT', 'UAT', 'PROD']
}
def getTagVersion(tagVersion){
    return tagVersion
}
pipeline {
    agent any

    environment {
        AZ_AKZ_USER = credentials('AZ_AKZ_USER')
        AZ_AKZ_PASSWORD = credentials('AZ_AKZ_PASSWORD')
        AZ_AKZ_TENANT = credentials('AZ_AKZ_TENANT')
        CONTAINER_IMAGE = 'linxianer12/open-online-testing-web'
        AZ_AKS_NAME = "kube-devops"
        AZ_AKS_RESOUCE_GROUP = "Elasticsearch-Stack"
        // ชื่อของเครื่องที่ต้องการจะ Hold Approve ก่อนที่จะ Deploy ขึ้นไป
        PRODUCTION_SERVER = "PROD"
        REACT_APP_BASE_API_URL = "https://api.opencloudnative.online"
        REACT_APP_BASE_APP_URL = "https://depa.opencloudnative.online"      
        // env ถ้าถูกกำหนดจากข้างบน System แล้ว .env ของ frontend ข้างล่างจะไม่มีผล
        // REACT_APP_TAG_VERSION = getTagVersion("v0.0.0")
    }

    stages {
        stage('Setup Default ENV') {
            steps {
                echo '=========== Verify Branch ============'
                echo "${GIT_BRANCH}"

                script {
                    // ตั้ง default tag สำหรับ branch อื่นๆที่ไมไ่ด้ build ผ่าน master
                    env.BUILD_BRANCH = "${GIT_BRANCH}-"
                    env.TAG_VERSION = "${BUILD_ID}"
                }
                echo "${env.BUILD_BRANCH}"
            }
        }

        stage('Input Data For Production') {
            // when {
            //     branch 'master'
            // }


            steps {
                script {
                    def git_tags = sh(script: 'git tag | sort -r', returnStdout: true)
                    def input_params = null
                    timeout(time: 30, unit: 'MINUTES') {
                        input_params = input message: 'Tag Versioning',
                        parameters : [
                            choice(name: 'TAG_VERSION', choices: "${git_tags}", description: 'เลือก Tags ที่ต้องการ'),
                            text(name: 'BUILD_ID', defaultValue:"${BUILD_ID}"),
                            text(name: 'LABEL_VERSION',defaultValue: getServerEnvironmentList()[0], description: 'Label ของ Application ที่ใช้กับ Kubernetes(เพื่อทำ traffic selector)'),
                            choice(name: 'SERVER_ENVIRONMENT', choices: getServerEnvironmentList(), description: 'เลือก Server Enviroment'),
                        ]
                    }
                    env.BUILD_ID = input_params.BUILD_ID
                    env.BUILD_BRANCH = ''
                    env.SERVER_ENVIRONMENT = input_params.SERVER_ENVIRONMENT
                    env.TAG_VERSION = input_params.TAG_VERSION
                    env.LABEL_VERSION = input_params.LABEL_VERSION
                    env.REACT_APP_TAG_VERSION = input_params.TAG_VERSION
                }
            }
        }

        stage('Build Yarn Project') {
            // build ทดลองใส่ตัวแปรบิ้วตรงนี้

            agent {
                docker {
                    image 'node:12'
                }
            }

            steps {
                script {
                    sh "echo ${REACT_APP_TAG_VERSION}"
                    sh "echo REACT_APP_TAG_VERSION=${env.TAG_VERSION} > .env"
                    sh "cat .env"
                    sh "npx browserslist@latest --update-db"
                    sh "yarn add react-scripts"
                    sh "yarn build"
                    stash name: 'static-artifact', includes: 'build/'
                }
            }
        }

        stage('Build Docker') {

            steps {
                script {
                    sh 'echo ============= Build Docker Image and Push ==================='
                    unstash 'static-artifact'
                    sh "ls"
                    def FULL_CONTAINER_IMAGE_PATH = "${CONTAINER_IMAGE}:${env.TAG_VERSION}"
                    env.FULL_CONTAINER_IMAGE_PATH = FULL_CONTAINER_IMAGE_PATH.replaceAll('/', "\\\\/")
                    docker.withRegistry("", '2846f756-a434-495b-852b-8922980f769d') {
                        def newApp = docker.build "${env.FULL_CONTAINER_IMAGE_PATH}"
                        newApp.push()
                    }
                }
            }
        }

        stage('Deploy to Development') {
            when {
                branch 'dev'
            }

            steps {
                echo '=========== We are Development branch ========='
            }
        }

        stage('Deploy to Kubernetes') {
            // when {
            //     branch 'master'
            // }

            agent {
                docker {
                    image 'mcr.microsoft.com/azure-cli:2.8.0'
                    args '--user root'
                }
            }

            steps {
               
                script {
                    sh "pwd"
                    def COMMIT_MESSAGE = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
                    // replace อักขระพิเศษออกไปป้องกัน sed มีปัญหา

                    env.COMMIT_MESSAGE = COMMIT_MESSAGE.replaceAll("(\')|(\")|(/)|(\\\\)|(\\()|(\\))|(\n)|(\t)", "")
                    env.BUILD_BRANCH = env.BUILD_BRANCH.replaceAll("(\')|(\")|(/)|(\\\\)|(\\()|(\\))", "\\\\/")
                    sh "echo ${env.COMMIT_MESSAGE}"
                  
                    sh "echo ============ AKS Credential ==============="
                    sh "az login --service-principal -u ${AZ_AKZ_USER} -p ${AZ_AKZ_PASSWORD} -t ${AZ_AKZ_TENANT}"
                    // ติดตั้ง AKS CLI บน Azure CLI Container เพื่อให้ใช้คำสั่ง K8S ได้
                    sh "az aks install-cli"
                    sh "az aks get-credentials -n ${AZ_AKS_NAME} -g ${AZ_AKS_RESOUCE_GROUP}"
                    // เลือก YAML สำหรับ Deploy ไปยัง K8S ให้ตรงกับ Enviroment ของเครื่องเช่น DEV, Staging, Production
                    // จะ Hold การ Auto Deploy เมื่อการบิ้วแล้วส่งไปยังเครื่องนั้นตรงกับชื่อเคร่องที่ Hold ไว้ (เพราะสำคัญห้าม Auto Deploy)
                    if ("${env.SERVER_ENVIRONMENT}" == "${PRODUCTION_SERVER}"){
                        // จะถามยืนยันก่อน Deploy ถ้าเป็น master build 
                         timeout(time: 30, unit: 'MINUTES') {
                            input message: 'Approve Deploy to Production?', ok: 'Yes'
                        }
                        env.K8S_DEPLOY_YAML_PROFILE = "k8s-deployment-production.yaml"
                        env.K8S_SERVICE_YAML_PROFILE = "k8s-service-production.yaml"
                    } else {
                        env.K8S_DEPLOY_YAML_PROFILE = "k8s-deployment.yaml"
                        env.K8S_SERVICE_YAML_PROFILE = "k8s-service-nodeport.yaml"
                    }
                    env.K8S_CONFIG_YAML_PROFILE = "k8s-configmap.yaml"
                     // ใช้กำหนด docker image ที่จะรัน pod
                    sh "sed -i 's/IMAGE_BUILD_ID/${env.TAG_VERSION}/g' ${env.K8S_DEPLOY_YAML_PROFILE}"
                    // สั่ง apply resource ไปยัง K8S
                    sh "echo =========================================="
                    sh "echo ============ Deploy to Kubernetes to ${env.SERVER_ENVIRONMENT} API ============="
                    // กำหนด Labels Tag ของ App
                    sh "sed -i 's/LABEL_VERSION/${env.LABEL_VERSION}/g' ${env.K8S_DEPLOY_YAML_PROFILE}"
                     // กำหนด change cause ของ rollout history
                    sh "sed -i 's/ENV_CHANGE_CAUSE_MESSAGE/[IMAGE] ${env.FULL_CONTAINER_IMAGE_PATH} - ${env.COMMIT_MESSAGE}/g' ${env.K8S_DEPLOY_YAML_PROFILE}"
                    // apply config map
                    sh "kubectl apply -f ${env.K8S_CONFIG_YAML_PROFILE}"
                    // สร้าง Deployment Resouce
                    sh "kubectl apply -f ${env.K8S_DEPLOY_YAML_PROFILE}"
                    // สร้าง Service Resouce สำหรับทำ Service Discovery
                    sh "kubectl apply -f ${env.K8S_SERVICE_YAML_PROFILE} --record=true"
                }
            }
        }
    }
}
