<script setup lang="ts">
import type { WidgetDesignData } from '@/components/vs-form-designer'
import DraggableWidget from '../../draggable-widget.vue'

defineProps<{
  parentNode?: WidgetDesignData
}>()

const widgetList = defineModel<WidgetDesignData[]>('widgetList', { default: () => [] })
const formData = defineModel<Record<string, any>[]>('formData', { default: () => [] })
</script>

<template>
  <div class="d-data-table">
    <DraggableWidget
      v-model:widget-list="widgetList"
      v-model:form-data="formData"
      where="data-table"
      :parent-node
    />
  </div>
</template>

<style lang="scss" scoped>
.d-data-table {
  flex: 1;
  position: relative;
  border: 2px dotted var(--vs-border-color);
  box-sizing: border-box;
  background-color: var(--vs-bg-color-page);
  :deep(.draggable-widget) {
    min-height: 110px;
    padding: 8px;
  }
}
</style>
