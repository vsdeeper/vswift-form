import type { DatePickerProps } from 'element-plus'
import DDatetimePicker from './d-datetime-picker.vue'
import type { Mutable } from '../..'

export type DDatetimePickerInstance = InstanceType<typeof DDatetimePicker>
export type DDatetimePickerOptions = Partial<Mutable<DatePickerProps>> & {
  label?: string
  required?: boolean
  columnWidth?: number
  columnMinWidth?: number
}
export { DDatetimePicker }
