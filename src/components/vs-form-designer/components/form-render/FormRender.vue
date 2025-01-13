<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { FormDesignData, WidgetDesignData, WidgetType } from '../..'

const props = defineProps<{
  formDesignData?: FormDesignData
}>()

const formRef = ref<FormInstance>()
const formConfig = computed(() => props.formDesignData?.form)
const widgetList = computed(() => props.formDesignData?.widgetList)
const model = defineModel<Record<string, any>>({ default: () => ({}) })
const fullscreenWidgets: WidgetType[] = [
  'text',
  'divider',
  'radio',
  'checkbox',
  'data-table',
  'recursive-area',
  'upload',
]

const getXl = (widget: WidgetDesignData) => {
  return fullscreenWidgets.includes(widget.type) ? undefined : (formConfig.value?.xl ?? 6)
}

const getLg = (widget: WidgetDesignData) => {
  return fullscreenWidgets.includes(widget.type) ? undefined : (formConfig.value?.lg ?? 8)
}

const getMd = (widget: WidgetDesignData) => {
  return fullscreenWidgets.includes(widget.type) ? undefined : (formConfig.value?.md ?? 12)
}

const validate = () => {
  return formRef.value?.validate()
}

defineExpose({
  validate,
})
</script>

<template>
  <el-form
    class="form-render"
    :class="{ 'auto-layout': formConfig?.autoLayout }"
    :model
    ref="formRef"
    v-bind="formConfig"
  >
    <el-row v-if="formConfig?.autoLayout" :gutter="20">
      <el-col
        v-for="item in widgetList"
        :key="item.id"
        :span="24"
        :xl="getXl(item)"
        :lg="getLg(item)"
        :md="getMd(item)"
      >
        <FormItem v-model="model" :design-data="item" />
      </el-col>
    </el-row>
    <template v-else>
      <FormItem v-for="item in widgetList" :key="item.id" v-model="model" :design-data="item" />
    </template>
  </el-form>
</template>

<style lang="scss" scoped>
.form-render.auto-layout {
  :deep(.vs-input-number),
  :deep(.vs-date-editor),
  :deep(.vs-cascader) {
    width: 100%;
  }
  :deep(.vs-input-number) {
    .vs-input__inner {
      text-align: left;
    }
  }
}
</style>
