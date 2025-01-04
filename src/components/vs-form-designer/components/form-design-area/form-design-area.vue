<script setup lang="ts">
import type { FormPropsSettings, WidgetDesignData } from '../..'

defineProps<{
  formProps: FormPropsSettings
}>()

const model = defineModel<WidgetDesignData[]>({ default: () => [] })
const formData = ref<Record<string, any>>({})
</script>

<template>
  <el-form
    class="form-design-area"
    v-bind="formProps"
    :model="formData"
    label-position="top"
    @submit.prevent
  >
    <DraggableWidget v-model:widget-list="model" v-model:form-data="formData" />
  </el-form>
</template>

<style lang="scss" scoped>
.form-design-area {
  :deep(.widget-field) {
    .vs-form-item__label {
      pointer-events: none;
    }
    .vs-form-item__content {
      & > div[class^='vs-'] {
        pointer-events: none;
      }
      & > .d-upload {
        pointer-events: none;
      }
    }
    .vs-date-editor,
    .vs-cascader {
      width: 100%;
    }
  }
}
</style>
