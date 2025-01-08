<script setup lang="ts">
import { ElMessage } from 'element-plus'
import type { FormDesignData } from '../..'
import type { FormRenderInstance } from '../form-render'
import { IconHorizontalFull } from '../icons'

const show = ref(false)
const formDesignData = ref<FormDesignData>()
const formData = ref<Record<string, any>>({})
const FormRenderRef = ref<FormRenderInstance>()
const size = ref('50%')

const onConfirm = async () => {
  const valid = await FormRenderRef.value?.validate()
  if (valid) {
    ElMessage.success('验证通过，请在控制台查看表单数据')
    console.log(formData.value)
  }
}

const onHorizontalFull = () => {
  size.value = size.value === '50%' ? '100%' : '50%'
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
  <el-drawer v-model="show" :size destroy-on-close>
    <template #title>
      <div class="vs-drawer__title">
        预览
        <el-button link @click="onHorizontalFull">
          <el-icon size="18px"><IconHorizontalFull /></el-icon>
        </el-button>
      </div>
    </template>
    <FormRender ref="FormRenderRef" v-model="formData" :form-design-data />
    <template #footer>
      <el-button @click="show = false">取消</el-button>
      <el-button type="primary" @click="onConfirm">确定</el-button>
    </template>
  </el-drawer>
</template>

<style lang="scss" scoped>
.vs-drawer__title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
