import type { InputNumberProps } from 'element-plus'
import DInputNumber from './d-input-number.vue'

export type DInputNumberInstance = InstanceType<typeof DInputNumber>
export type DInputNumberOptions = Partial<InputNumberProps> & {
  label?: string
  defaultValue?: number
  required?: boolean
  columnWidth?: number
  columnMinWidth?: number
}
export { DInputNumber }
