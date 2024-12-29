import type { TextProps } from 'element-plus'
import DText from './d-text.vue'

export type DTextInstance = InstanceType<typeof DText>
export type DTextOptions = Partial<TextProps> & { text?: string }
export { DText }
