// POST
// Url -> /examination/:examId?user=keyword&password=asdfasdfasdf

// request body
const answers = [
  {
    questionType: 'SUBJECTIVE', // อัตนัย
    questionId: 1,
    questionName: 'ไก่กับไข่อะไรเกิดก่อนกัน เพราะอะไร?',
    answer: ['ไก่มั้ง เพราะ ......'],
  },
  {
    questionType: 'OBJECTIVE', // multiple choice ปรนัย
    questionId: 1,
    questionName: 'ข้อใดเป็นภาษาโปรแกรมมิ่ง?',
    answer: [
      // choice data
      'html',
      'JavaScript',
    ],
  },
]
const feAnswer = [
  { question: 1, answer: ['asdfasdf'] },
  { question: 2, answer: ['หกดหกดหกดหกด', 'asdfasdf'] },
]

const choices = [
  // choice from exam's question
  {
    id: 1,
    label: 'html',
    isCorrectAnswer: false,
  },
  {
    id: 2,
    label: 'kotlin',
    isCorrectAnswer: true,
  },
  {
    id: 3,
    label: 'javascript',
    isCorrectAnswer: true,
  },
  {
    id: 4,
    label: 'css',
    isCorrectAnswer: false,
  },
]

const answer = ['html', 'javascript'] // answers

// html, JavaScript
const verifyAnswer = (choices, answer) => {
  const isCorrect = false
  // if answer is javascript and kotlin
  answer.forEach((ans) => {
    // ['html', kotlin, javascript, css] includes (html)
    const transformChoices = choices.map((choice) => choice.label)
    if (transformChoices.includes(ans)) {
    }
  })
  return isCorrect
}

const data = {
  exams: [
    {
      id: 1,
      name: 'ข้อสอบเพิ่มความรู้ ชุดที่ 1',
      questions: [
        {
          id: 1,
          name: 'If you have 20 harems, what place that you must go?',
          type: 'objective',
          correctAnser: [
            // check แค่ไหนนี้พอ size =2 แสดงว่า correct number = 2 ด้วย
            'berlin', // ['berlin', 'leipzig', 'bangkok]
            'bangkok',
          ],
          choices: [
            {
              id: 1,
              label: 'Berlin',
              isCorrectAnswer: false,
            },
            {
              id: 2,
              label: 'Leipzig',
              isCorrectAnswer: false,
            },
            {
              id: 3,
              label: 'Munich',
              isCorrectAnswer: true,
            },
            {
              id: 4,
              label: 'Zurich',
              isCorrectAnswer: false,
            },
          ],
          categories: [
            {
              label: 'history',
              backgroundColor: '#2d2a4a',
              color: '#ffffff',
            },
          ],
        },
      ],
    },
  ],
}
