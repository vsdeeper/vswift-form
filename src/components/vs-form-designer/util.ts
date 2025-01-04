import { customAlphabet } from 'nanoid'
import type { WidgetType } from '.'

export const nanoid5 = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 5)
export const genWidgetId = (type: WidgetType) => `${type.replace(/-/g, '')}${nanoid5()}`
export const deleteExtraFieldsReplacer = (key: string, val: any) => {
  if (key === '__selected' && typeof val === 'boolean') {
    return undefined
  }
  return val
}
