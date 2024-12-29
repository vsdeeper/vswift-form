import type { CheckboxGroupProps } from 'element-plus'
import DCheckbox from './d-checkbox.vue'
import type { OptionsConfigItem } from '@/components/vs-form-designer/components'

export type DCheckboxInstance = InstanceType<typeof DCheckbox>
export type DCheckboxOptions = Partial<CheckboxGroupProps> & {
  options?: Record<string, any>[]
  checkboxType?: 'button'
  defaultValue?: any
  required?: boolean
  optionData?: OptionsConfigItem[]
  map?: { label?: string; value?: string }
}
export { DCheckbox }
