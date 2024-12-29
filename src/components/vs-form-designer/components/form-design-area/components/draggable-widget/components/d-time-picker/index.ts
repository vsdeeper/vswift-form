import type { TimePickerDefaultProps } from 'element-plus'
import DTimePicker from './d-time-picker.vue'
import type { Mutable } from '../..'

export type DTimePickerInstance = InstanceType<typeof DTimePicker>
export type DTimePickerOptions = Partial<Mutable<TimePickerDefaultProps>> & {
  label?: string
  required?: boolean
  columnWidth?: number
  columnMinWidth?: number
}
export { DTimePicker }
