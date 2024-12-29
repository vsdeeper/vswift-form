import type { DatePickerProps } from 'element-plus'
import DDatePicker from './d-date-picker.vue'
import type { Mutable } from '../..'

export type DDatePickerInstance = InstanceType<typeof DDatePicker>
export type DDatePickerOptions = Partial<Mutable<DatePickerProps>> & {
  label?: string
  required?: boolean
  columnWidth?: number
  columnMinWidth?: number
}
export { DDatePicker }
