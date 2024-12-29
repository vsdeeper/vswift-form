import type { FormProps } from 'element-plus'
import 'element-plus/theme-chalk/src/message.scss'
import VsFormDesigner from './vs-form-designer.vue'
import type { Mutable } from './components'

export type WidgetType =
  // 以下组件分类
  | 'basic'
  | 'form'
  | 'custom'
  // 以下基础组件
  | 'text'
  | 'grid-layout'
  | 'grid-col'
  | 'table-layout'
  | 'divider'
  | 'data-table'
  | 'recursive-area'
  // 以下表单组件
  | 'input'
  | 'input-number'
  | 'radio'
  | 'checkbox'
  | 'select'
  | 'cascader'
  | 'date-picker'
  | 'datetime-picker'
  | 'time-picker'
  | 'upload'
// 以下自定义组件

export type FormDesign = Partial<Mutable<FormProps>> & { autoLayout?: boolean }
export interface WidgetDesignData<Options = Record<string, any>> {
  id: string
  type: WidgetType
  options: Options
  widgetList?: WidgetDesignData<Options>[]
  [key: string]: any
}
export interface FormDesignData {
  form: FormDesign
  widgetList: WidgetDesignData[]
}
export type VsFormDesignerInstance = InstanceType<typeof VsFormDesigner>
export { VsFormDesigner }
