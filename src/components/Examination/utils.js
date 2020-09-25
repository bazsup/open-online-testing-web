import dayjs from 'dayjs'

export function isExaminationEnd(endAt) {
  const now = dayjs()
  endAt = dayjs(endAt)

  return now > endAt
}

function getThailandDateFormat(timestamp) {
  const thailandMonth = [
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฎาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤศจิกายน',
    'ธันวาคม',
  ]
  const thailandDay = [
    'อาทิตย์',
    'จันทร์',
    'อังคาร',
    'พุธ',
    'พฤหัสบดี',
    'ศุกร์',
    'เสาร์',
  ]

  timestamp = dayjs(timestamp)
  const day = thailandDay[timestamp.day()]
  const month = thailandMonth[timestamp.month()]
  const year = timestamp.year() + 543
  const hour = timestamp.hour() < 10 ? `0${timestamp.hour()}` : timestamp.hour()
  const minute =
    timestamp.minute() < 10 ? `0${timestamp.minute()}` : timestamp.minute()
  return {
    day,
    date: timestamp.date(),
    month,
    year,
    hour,
    minute,
  }
}

export function getExaminationDateFormat(startAt, endAt) {
  startAt = dayjs(startAt)
  endAt = dayjs(endAt)

  const startAtThailandFormat = getThailandDateFormat(startAt)
  const endAtThailandFormat = getThailandDateFormat(endAt)

  const isExaminationEndInDifferentDate = !(
    endAt.startOf('day').diff(startAt.startOf('day'), 'day') === 0
  )
  if (isExaminationEndInDifferentDate) {
    return (
      `ระหว่างวัน${startAtThailandFormat.day}ที่ ${startAtThailandFormat.date} ${startAtThailandFormat.month} พ.ศ.${startAtThailandFormat.year}` +
      ` เวลา ${startAtThailandFormat.hour}.${startAtThailandFormat.minute} น.` +
      ` ถึง วัน${endAtThailandFormat.day}ที่ ${endAtThailandFormat.date} ${endAtThailandFormat.month} พ.ศ.${endAtThailandFormat.year}` +
      ` เวลา ${endAtThailandFormat.hour}.${endAtThailandFormat.minute} น.`
    )
  }
  return (
    `วัน${startAtThailandFormat.day}ที่ ${startAtThailandFormat.date} ${startAtThailandFormat.month} พ.ศ.${startAtThailandFormat.year}` +
    ` เวลา ${startAtThailandFormat.hour}.${startAtThailandFormat.minute}` +
    ` ถึง ${endAtThailandFormat.hour}.${endAtThailandFormat.minute} น.`
  )
}
