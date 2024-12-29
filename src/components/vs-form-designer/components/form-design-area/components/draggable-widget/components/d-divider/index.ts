import type { DividerProps } from 'element-plus'
import DDivider from './d-divider.vue'

export type DDividerInstance = InstanceType<typeof DDivider>
export type DDividerOptions = Partial<DividerProps> & {
  text?: string
}
export { DDivider }
