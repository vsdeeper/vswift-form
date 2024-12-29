import { last, pascal } from 'radash'
import type {
  DTextInstance,
  DInputInstance,
  DInputNumberInstance,
  DRadioInstance,
  DCheckboxInstance,
  DSelectInstance,
  DCascaderInstance,
  DDatePickerInstance,
  DDatetimePickerInstance,
  DTimePickerInstance,
  DUploadInstance,
  DDividerInstance,
  DDataTableInstance,
  DRecursiveAreaInstance,
  DGridLayoutInstance
} from '.'
import type { AsyncComponentLoader } from 'vue'

export * from './d-text'
export * from './d-input'
export * from './d-input-number'
export * from './d-radio'
export * from './d-checkbox'
export * from './d-select'
export * from './d-cascader'
export * from './d-date-picker'
export * from './d-datetime-picker'
export * from './d-time-picker'
export * from './d-upload'
export * from './d-divider'
export * from './d-data-table'
export * from './d-recursive-area'
export * from './d-grid-layout'
export * from './d-grid-col'

// 生成动态组件对象
export type DComponentMap = {
  Text?: DTextInstance
  Input?: DInputInstance
  InputNumber?: DInputNumberInstance
  Radio?: DRadioInstance
  Checkbox?: DCheckboxInstance
  Select?: DSelectInstance
  Cascader?: DCascaderInstance
  DatePicker?: DDatePickerInstance
  DatetimePicker?: DDatetimePickerInstance
  TimePicker?: DTimePickerInstance
  Upload?: DUploadInstance
  Divider?: DDividerInstance
  DataTable?: DDataTableInstance
  RecursiveArea?: DRecursiveAreaInstance
  GridLayout?: DGridLayoutInstance
}
export type DComponentKey = keyof DComponentMap

const matchFiles = import.meta.glob('./**/d-*.vue')
const DComponent: DComponentMap = {}

for (const filePath in matchFiles) {
  const filePathArr = filePath.split('/')
  const key = pascal(
    last(filePathArr)?.replace('d-', '').replace('.vue', '') ?? 'Unknown'
  ) as DComponentKey
  DComponent[key] = defineAsyncComponent({
    loader: matchFiles[filePath] as AsyncComponentLoader
  })
}

export { DComponent }
