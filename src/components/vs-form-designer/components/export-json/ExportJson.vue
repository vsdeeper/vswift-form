<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { aceConfigInit } from '../../ace-config'

const AceEditor = defineAsyncComponent({
  loader: async () => (await import('vue3-ace-editor')).VAceEditor,
})

const show = ref(false)
const editorRef = ref()
const json = ref('')

const onConfirm = () => {
  try {
    const editor = editorRef.value._editor
    const annot = editor.session.$annotations
    if (annot.length) {
      ElMessage.error('json数据格式错误')
      return
    }
    navigator.clipboard.writeText(json.value)
    show.value = false
    ElMessage.success('复制成功')
  } catch (error) {
    console.log(error)
  }
}

const open = (data: string) => {
  show.value = true
  json.value = data
}

onMounted(() => {
  aceConfigInit()
})

defineExpose({
  open,
})
</script>

<template>
  <el-drawer v-model="show" title="导出JSON" size="50%">
    <AceEditor
      ref="editorRef"
      v-model:value="json"
      class="ace-editor"
      lang="json"
      theme="chrome"
      :options="{
        useWorker: true,
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
      }"
    />
    <template #footer>
      <el-button @click="show = false">取消</el-button>
      <el-button type="primary" @click="onConfirm">复制JSON</el-button>
    </template>
  </el-drawer>
</template>

<style lang="scss" scoped>
.ace-editor {
  font-size: 12px;
  width: 100%;
  height: 100%;
}
</style>
