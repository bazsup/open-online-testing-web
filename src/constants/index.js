export const color = {
  orange: '#ee7423',
  purple: '#6C5DBB',
  grey: '#A4A7B2',
  softGrey: '#F5F6F8',
  darkGrey: '#3D3C43',
}

export const JWT_TOKEN = 'jwtToken'

const API_BASE_URL = process.env.REACT_APP_BASE_API_URL

const getBaseUrl = () => {
  return (window && window.location.origin) || 'http://localhost:3000'
}

const OAUTH_REDIRECT_URI = getBaseUrl() + '/oauth2/redirect'

export const GOOGLE_AUTH_URL =
  API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH_REDIRECT_URI
export const FACEBOOK_AUTH_URL =
  API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH_REDIRECT_URI

export const lang = {
  th: {
    // common
    pleaseTrygain: 'เกิดข้อผิดพลาด โปรดลองใหม่อีกครั้ง',

    // login
    loginSuccess: 'เข้าสู่ระบบสำเร็จ',
    loginFail: 'เข้าสู่ระบบไม่สำเร็จ โปรดลองใหม่อีกครั้ง',
    login: 'เข้าสู่ระบบ',
    email: 'อีเมล',
    password: 'รหัสผ่าน',
    doesNotHaveAnAccount: 'ยังไม่มีบัญชี?',
    or: 'หรือ',
    clickToRegister: 'คลิกเพื่อลงทะเบียน',

    // register page
    register: 'ลงทะเบียน',
    fullname: 'ชื่อ-นามสกุล',
    registerTitle: 'ลงทะเบียนฟรี!',
    registerSuccess: `ลงทะเบียนสำเร็จ`,
    alreadyHaveAccount: 'มีบัญชีอยู่แล้ว?',
    passwordHint:
      'รหัสผ่านต้องประกอบด้วย ตัวอักษรทั้งพิมพ์เล็ก พิมพ์ใหญ่ และตัวเลขผสมกัน ความยาวไม่น้อยกว่า 8 ตัวอักษร',
    passwordHintCheckList: ['ตัวอักษร (a-z)',  'ตัวอักษร (A-Z)', 'ตัวเลข (0-9)'],

    // header
    welcome: 'ยินดีต้อนรับ',
    logout: 'ออกจากระบบ',

    // error
    invalidEmailOrPassword: '⚠️ อีเมลหรือรหัสผ่านไม่ถูกต้อง',
  },
}
export const QUESTIONTYPE = {
  OBJECTIVE: 'OBJECTIVE',
  SUBJECTIVE: 'SUBJECTIVE',
}
