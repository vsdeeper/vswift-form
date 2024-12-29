<script setup lang="ts">
import type { WidgetDesignData } from '@/components/vs-form-designer'
import type { DUploadOptions } from '.'
import type {
  UploadFile,
  UploadFiles,
  UploadInstance,
  UploadRawFile,
  UploadStatus,
  UploadUserFile,
} from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const props = defineProps<{
  designData: WidgetDesignData
}>()

const uploadRef = ref<UploadInstance>()
const model = defineModel<UploadUserFile[]>({ default: () => [] })
const options = computed<DUploadOptions>(() => props.designData.options)
const slots = useSlots()
const previewSrcList = ref<string[]>([])
const showImagePreview = ref(false)
const tipArr = computed(() => {
  const arr: string[] = []
  if (typeof options.value.singleFileSizeLimit === 'number') {
    arr.push(`单文件大小不超过${options.value.singleFileSizeLimit}KB`)
  }
  if (typeof options.value.totalFileSizeLimit === 'number') {
    arr.push(`总文件大小不超过${options.value.totalFileSizeLimit}M`)
  }
  if (typeof options.value.amountLimit === 'number') {
    arr.push(`最多允许上传${options.value.amountLimit}个文件`)
  }
  return arr
})

const onPreview = (uploadFile: UploadFile) => {
  previewSrcList.value = [uploadFile.url!]
  showImagePreview.value = true
}

const onSuccess = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  console.log('onSuccess', response, uploadFile, uploadFiles)
}

const onError = (error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  console.log('onError', error, uploadFile, uploadFiles)
}

// 以下defineExpose
function abort(file: UploadFile) {
  uploadRef.value?.abort(file)
}

function submit() {
  uploadRef.value?.submit()
}

function clearFiles(status?: UploadStatus[]) {
  uploadRef.value?.clearFiles(status)
}

function handleStart(rawFile: UploadRawFile) {
  uploadRef.value?.handleStart(rawFile)
}

function handleRemove(file: UploadFile | UploadRawFile) {
  uploadRef.value?.handleRemove(file)
}

defineExpose({
  abort,
  submit,
  clearFiles,
  handleStart,
  handleRemove,
})
</script>

<template>
  <el-upload
    ref="uploadRef"
    class="d-upload"
    :class="{ [options.listType || 'text']: true }"
    v-bind="options"
    v-model:file-list="model"
    :on-preview="onPreview"
    :on-success="onSuccess"
    :on-error="onError"
  >
    <template #default>
      <el-icon v-if="options.listType === 'picture-card'"><Plus /></el-icon>
      <el-button v-else type="primary">选择文件</el-button>
      <div v-if="typeof options.amountLimit === 'number'" class="limit-tip">
        {{ model.length }}/{{ options.amountLimit }}
      </div>
    </template>
    <template v-if="slots.trigger" #trigger>
      <slot name="trigger"></slot>
    </template>
    <template #tip>
      <slot name="tip" :options>
        <div class="vs-upload__tip">
          {{ tipArr.join('，') }}
        </div>
      </slot>
    </template>
    <template v-if="slots.file" #file>
      <slot name="file"></slot>
    </template>
  </el-upload>
  <el-image v-if="showImagePreview" v-bind="options.imagePreviewProps" :preview-src-list />
</template>

<style lang="scss" scoped>
.d-upload {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--vs-border-color);
  border-radius: var(--vs-border-radius-base);
  :deep(.vs-upload) {
    display: flex;
    justify-content: space-between;
    align-items: start;
  }
  .limit-tip {
    font-size: 14px;
    line-height: 1;
    color: var(--vs-text-color-regular);
  }
  &.picture-card {
    :deep(.vs-upload) {
      position: relative;
      justify-content: space-around;
      align-items: center;
    }
    .limit-tip {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 12px;
      line-height: 1;
      padding: 5px;
      color: var(--vs-text-color-secondary);
    }
  }
}
</style>
