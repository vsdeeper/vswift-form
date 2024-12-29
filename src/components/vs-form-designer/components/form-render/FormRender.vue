<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { FormDesignData } from '../..'

const props = defineProps<{
  formDesignData?: FormDesignData
}>()

const formRef = ref<FormInstance>()
const formConfig = computed(() => props.formDesignData?.form)
const widgetList = computed(() => props.formDesignData?.widgetList)
const model = defineModel<Record<string, any>>({ default: () => ({}) })

const validate = () => {
  return formRef.value?.validate()
}

defineExpose({
  validate,
})
</script>

<template>
  <el-form class="form-render" :model ref="formRef" v-bind="formConfig">
    <FormItem v-for="item in widgetList" :key="item.id" v-model="model" :design-data="item" />
  </el-form>
</template>

<style lang="scss" scoped>
.form-render {
  :deep(.vs-input-number),
  :deep(.vs-date-editor),
  :deep(.vs-cascader) {
    width: 100%;
  }
}
</style>
