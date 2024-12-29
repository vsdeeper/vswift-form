<script setup lang="ts">
import { useFormDesignerStore } from '@/stores'

const model = ref<Record<string, any>>({})
const formDesignData = computed(() => useFormDesignerStore().formDesignData)
</script>

<template>
  <!-- {{ formDesignData }} -->
  <el-form
    class="form-design-area"
    v-bind="formDesignData.form"
    :model
    label-position="top"
    @submit.prevent
  >
    <DraggableWidget v-model:widget-list="formDesignData.widgetList" v-model:form-data="model" />
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
