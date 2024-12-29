<script setup lang="ts">
import type { WidgetDesignData } from '@/components/vs-form-designer'
import { DGridCol } from '../d-grid-col'

const props = defineProps<{
  formData: Record<string, any>[]
  designData: WidgetDesignData
}>()

const _formData = computed(() => props.formData)
</script>

<template>
  <el-row class="d-grid-layout">
    <DGridCol :form-data="_formData" :design-data="designData.widgetList!" />
  </el-row>
</template>

<style lang="scss" scoped>
.d-grid-layout {
  width: 100%;
  min-height: 45px;
  border: 2px dotted var(--vs-border-color);
}
</style>
