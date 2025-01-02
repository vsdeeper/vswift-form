import type { FormDesignData, WidgetDesignData } from '@/components'
// import { defineStore } from 'pinia'

export const formDesignData = ref<FormDesignData>({
  form: {
    labelWidth: 120,
    labelPosition: 'left',
  },
  widgetList: [],
})
export const activeWidgetDesignData = ref<WidgetDesignData>()

export const setActiveWidgetDesignData = (data?: WidgetDesignData) => {
  if (activeWidgetDesignData.value) {
    activeWidgetDesignData.value.__selected = false
  }
  if (data) {
    data.__selected = true
  }
  activeWidgetDesignData.value = data
}

// export default defineStore('form-designer', () => {
//   const formDesignData = ref<FormDesignData>({
//     form: {
//       labelWidth: 120,
//       labelPosition: 'left',
//     },
//     widgetList: [],
//   })
//   const activeWidgetDesignData = ref<WidgetDesignData>()

//   const setActiveWidgetDesignData = (data?: WidgetDesignData) => {
//     if (activeWidgetDesignData.value) {
//       activeWidgetDesignData.value.__selected = false
//     }
//     if (data) {
//       data.__selected = true
//     }
//     activeWidgetDesignData.value = data
//   }

//   return {
//     formDesignData,
//     activeWidgetDesignData,
//     setActiveWidgetDesignData,
//   }
// })
