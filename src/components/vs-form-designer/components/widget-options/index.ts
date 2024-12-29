import type { WidgetType } from '../..'

export { default as WidgetOptions } from './widget-options.vue'

export interface WidgetOptionItem {
  label: string
  value: WidgetType
  children?: WidgetOptionItem[]
}
