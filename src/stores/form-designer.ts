import type { FormDesignData, WidgetDesignData } from '@/components'
import { nanoid5 } from '@/components/vs-form-designer/util'

export const initFormDesignData = (): FormDesignData => ({
  form: {
    id: `form${nanoid5()}`,
    labelWidth: 120,
    labelPosition: 'left',
  },
  widgetList: [],
})
export const formDesignData = ref<FormDesignData>()
export const activeWidgetDesignData = ref<WidgetDesignData>()

export const setFormDesignData = (data: FormDesignData) => {
  formDesignData.value = data
}

export const getFormDesignData = () => {
  return formDesignData.value
}

export const setActiveWidgetDesignData = (data?: WidgetDesignData) => {
  if (activeWidgetDesignData.value) {
    activeWidgetDesignData.value.__selected = false
  }
  if (data) {
    data.__selected = true
  }
  activeWidgetDesignData.value = data
}
