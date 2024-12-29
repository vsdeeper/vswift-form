import type { ISelectProps } from 'element-plus'
import DSelect from './d-select.vue'
import type { OptionsConfigItem } from '@/components/vs-form-designer/components'

export type DSelectInstance = InstanceType<typeof DSelect>
export type DSelectOptions = Partial<ISelectProps> & {
  label?: string
  optionData?: OptionsConfigItem[]
  defaultValue?: any
  required?: boolean
  dataSource?: 'customize' | 'systemApi'
  systemApi?: string
  map?: { label?: string; value?: string }
}
export { DSelect }
