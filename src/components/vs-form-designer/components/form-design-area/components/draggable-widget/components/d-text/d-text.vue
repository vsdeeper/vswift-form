<script setup lang="ts">
import type { WidgetDesignData } from '@/components/vs-form-designer'
import type { DTextOptions } from '.'

const props = defineProps<{
  designData: WidgetDesignData
}>()

const options = computed<DTextOptions>(() => props.designData.options)
</script>

<template>
  <el-text v-bind="{ type: 'info', ...options }">
    {{ options.text }}
  </el-text>
</template>

<style lang="scss" scoped>
.vs-text {
  display: block;
  width: 100%;
  padding: 12px 0;
}
</style>
