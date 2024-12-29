import type { FormDesignData, WidgetDesignData } from '@/components'
import { defineStore } from 'pinia'

export default defineStore('form-designer', () => {
  const formDesignData = ref<FormDesignData>({
    form: {
      labelWidth: 120,
      labelPosition: 'left',
    },
    widgetList: [],
  })
  const activeWidgetDesignData = ref<WidgetDesignData>()

  const setActiveWidgetDesignData = (data?: WidgetDesignData) => {
    if (activeWidgetDesignData.value) {
      activeWidgetDesignData.value.__selected = false
    }
    if (data) {
      data.__selected = true
    }
    activeWidgetDesignData.value = data
  }

  return {
    formDesignData,
    activeWidgetDesignData,
    setActiveWidgetDesignData,
  }
})
