import type { ExtractPropTypes } from 'vue'
import type { cascaderProps } from 'element-plus'
import DCascader from './d-cascader.vue'

export type DCascaderInstance = InstanceType<typeof DCascader>
export type DCascaderOptions = Partial<ExtractPropTypes<typeof cascaderProps>> & {
  label?: string
  required?: boolean
  multiple?: boolean
  systemApi?: string
  map?: { label?: string; value?: string }
}
export { DCascader }
