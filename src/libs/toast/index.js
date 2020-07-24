import { message } from 'antd'

message.config({ duration: 3, top: 50 })

export const toast = {
  success: (toastMessage) => {
    return message.success({ content: toastMessage })
  },

  error: (toastMessage) => {
    return message.error({ content: toastMessage })
  },

  info: (toastMessage) => {
    return message.info({ content: toastMessage })
  },

  warning: (toastMessage) => {
    return message.warning({ content: toastMessage })
  },

  warn: (toastMessage) => {
    return message.warn({ content: toastMessage })
  },

  loading: (toastMessage) => {
    return message.loading({ content: toastMessage })
  },
}
