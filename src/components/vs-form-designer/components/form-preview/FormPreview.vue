<script setup lang="ts">
import { ElMessage } from 'element-plus'
import type { FormDesignData } from '../..'
import type { FormRenderInstance } from '../form-render'

const show = ref(false)
const formDesignData = ref<FormDesignData>()
const formData = ref<Record<string, any>>({})
const FormRenderRef = ref<FormRenderInstance>()

const onConfirm = async () => {
  const valid = await FormRenderRef.value?.validate()
  if (valid) {
    ElMessage.success('验证通过，请在控制台查看表单数据')
    console.log(formData.value)
  }
}

const open = (data: FormDesignData) => {
  show.value = true
  formDesignData.value = data
}

defineExpose({
  open,
})
</script>

<template>
  <el-drawer v-model="show" title="预览" size="50%">
    <FormRender ref="FormRenderRef" v-model="formData" :form-design-data />
    <template #footer>
      <el-button @click="show = false">取消</el-button>
      <el-button type="primary" @click="onConfirm">确定</el-button>
    </template>
  </el-drawer>
</template>
