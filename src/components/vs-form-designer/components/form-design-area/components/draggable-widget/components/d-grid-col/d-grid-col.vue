<script setup lang="ts">
import type { WidgetDesignData } from '@/components/vs-form-designer'
import DraggableWidget from '../../draggable-widget.vue'
import type { DGridColOptions } from '.'

const props = defineProps<{
  formData: Record<string, any>
  designData: WidgetDesignData<DGridColOptions>[]
}>()

const _formData = computed(() => props.formData)
</script>

<template>
  <el-col class="my-col" v-for="col in designData" :key="col.id">
    <div class="col-inner">
      <div class="col-widget">
        <DraggableWidget
          v-model:widgetList="col.widgetList!"
          :form-data="_formData"
          where="grid-col"
        />
      </div>
    </div>
  </el-col>
</template>

<style lang="scss" scoped>
.my-col {
  display: flex;
  min-height: 50px;
  border: 2px solid #fff;
  background-color: #fff;
  .col-inner {
    display: flex;
    flex: 1;
    border: 2px solid #fff;
    background-color: #fff;
    .col-widget {
      flex: 1;
      border: 2px dotted var(--vs-border-color);
    }
  }
  :deep(.note) {
    font-size: 12px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
