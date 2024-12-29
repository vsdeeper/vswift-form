import { last } from 'radash'
import type { TextDesignerInstance } from './text-designer'
import type { AsyncComponentLoader } from 'vue'

export * from './options-config'

// 生成动态组件对象
export type DesignerComponentMap = {
  Text?: TextDesignerInstance
}
export type DesignerComponentKey = keyof DesignerComponentMap

const matchFiles = import.meta.glob('./*-designer/*Designer.vue')
const DesignerComponent: DesignerComponentMap = {}

for (const filePath in matchFiles) {
  const filePathArr = filePath.split('/')
  const key = (last(filePathArr)?.replace('Designer.vue', '') ?? 'Unknown') as DesignerComponentKey
  DesignerComponent[key] = defineAsyncComponent({
    loader: matchFiles[filePath] as AsyncComponentLoader,
  })
}

export { DesignerComponent }
