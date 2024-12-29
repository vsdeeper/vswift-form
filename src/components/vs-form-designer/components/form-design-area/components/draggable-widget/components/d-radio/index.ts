import type { RadioGroupProps } from 'element-plus'
import DRadio from './d-radio.vue'
import type { OptionsConfigItem } from '@/components/vs-form-designer/components'

export type DRadioInstance = InstanceType<typeof DRadio>
export type DRadioOptions = Partial<RadioGroupProps> & {
  label?: string
  radioType?: 'button'
  defaultValue?: any
  required?: boolean
  optionData?: OptionsConfigItem[]
  map?: { label?: string; value?: string }
}
export { DRadio }
