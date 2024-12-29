import type { ImageProps, UploadProps } from 'element-plus'
import DUpload from './d-upload.vue'

export type DUploadInstance = InstanceType<typeof DUpload>
export type DUploadOptions = Partial<UploadProps> & {
  label?: string
  required?: boolean
  api?: string
  singleFileSizeLimit?: number
  totalFileSizeLimit?: number
  amountLimit?: number
  imagePreviewProps?: ImageProps
}
export { DUpload }
