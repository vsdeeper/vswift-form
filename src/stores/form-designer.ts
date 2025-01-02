import type { FormDesignData, WidgetDesignData } from '@/components'
import { nanoid5 } from '@/components/vs-form-designer/util'

export const formDesignData = ref<FormDesignData>({
  form: {
    id: `form${nanoid5()}`,
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
