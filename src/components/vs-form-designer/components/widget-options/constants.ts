import type { WidgetOptionItem } from '.'

export const widgetOptions: WidgetOptionItem[] = [
  {
    label: '基础组件',
    value: 'basic',
    children: [
      { label: '文本', value: 'text' },
      { label: '分隔线', value: 'divider' },
      // { label: '栅格布局', value: 'grid-layout' },
      // { label: '表格布局', value: 'table-layout' },
      { label: '数据表格', value: 'data-table' },
      { label: '递归域', value: 'recursive-area' }
    ]
  },
  {
    label: '表单组件',
    value: 'form',
    children: [
      { label: '输入框', value: 'input' },
      { label: '数字输入框', value: 'input-number' },
      { label: '单选框', value: 'radio' },
      { label: '多选框', value: 'checkbox' },
      { label: '选择器', value: 'select' },
      { label: '级联选择器', value: 'cascader' },
      { label: '日期选择器', value: 'date-picker' },
      { label: '日期时间选择器', value: 'datetime-picker' },
      { label: '时间选择器', value: 'time-picker' },
      { label: '上传', value: 'upload' }
    ]
  }
  // {
  //   label: '自定义组件',
  //   value: 'custom',
  //   children: []
  // }
]
