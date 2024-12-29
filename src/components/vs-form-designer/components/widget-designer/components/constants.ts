export const TYPE_OPTIONS = [
  { label: 'primary', value: 'primary' },
  { label: 'success', value: 'success' },
  { label: 'warning', value: 'warning' },
  { label: 'danger', value: 'danger' },
  { label: 'info', value: 'info' },
]

export const SIZE_OPTIONS = [
  { label: 'large', value: 'large' },
  { label: 'default', value: 'default' },
  { label: 'small', value: 'small' },
]

export const DIRECTION_OPTIONS = [
  { label: 'horizontal', value: 'horizontal' },
  { label: 'vertical', value: 'vertical' },
]

export const BORDER_STYLE_OPTIONS = [
  { label: 'solid', value: 'solid' },
  { label: 'dashed', value: 'dashed' },
  { label: 'hidden', value: 'hidden' },
]

export const CONTENT_POSITION_OPTIONS = [
  { label: 'left', value: 'left' },
  { label: 'right', value: 'right' },
  { label: 'center', value: 'center' },
]

export const INPUT_TYPE_OPTIONS = [
  { label: 'text', value: 'text' },
  { label: 'textarea', value: 'textarea' },
  { label: 'password', value: 'password' },
]

export const DATE_PICKER_TYPE_OPTIONS = [
  { label: 'date', value: 'date' },
  { label: 'daterange', value: 'daterange' },
  { label: 'month', value: 'month' },
  { label: 'monthrange', value: 'monthrange' },
]

export const DATETIME_PICKER_TYPE_OPTIONS = [
  { label: 'datetime', value: 'datetime' },
  { label: 'datetimerange', value: 'datetimerange' },
]

export const UPLOAD_LIST_TYPE_OPTIONS = [
  { label: 'text', value: 'text' },
  { label: 'picture', value: 'picture' },
  { label: 'picture-card', value: 'picture-card' },
]

export const PATTERN_OPTIONS = [
  { label: '数字', value: '^(0|[1-9][0-9]*)$' },
  { label: '邮编', value: '^[0-9]{6}$' },
  { label: '邮箱', value: '^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*.\\w+([-.]w+)*$' },
  { label: '手机号', value: '^1[0-9]\\d{9}$' },
  { label: '座机号', value: '^((0\\d{2,3})-)(\\d{7,8})(-(\\d{3,}))?$' },
  {
    label: '手机号或座机号',
    value: '^(1[0-9]\\d{9}|([(（]?0[0-9]{2,3}[）)]?[-]?)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?)$',
  },
  { label: '身份证号', value: '(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)' },
  { label: '银行卡号', value: '^\\d{16,19}$' },
  { label: '网址', value: '(http|https)://([\\w.]+/?)S*' },
  { label: '仅中文字符', value: '^[\\u4e00-\\u9fa5]+$' },
  { label: '非中文字符', value: '^[^\\u4e00-\\u9fa5]{0,}$' },
]

export const CONTROLS_POSITION_OPTIONS = [{ label: 'right', value: 'right' }]

export const SYSTEM_API_OPTIONS = [{ label: '示例接口', value: '/api/list' }]
