<script setup lang="ts">
import type { WidgetDesignData } from '@/components/vs-form-designer'
import type { DDividerOptions } from '.'

const props = defineProps<{
  designData: WidgetDesignData
}>()

const options = computed<DDividerOptions>(() => props.designData.options)
</script>

<template>
  <el-divider v-bind="options">
    <template #default>{{ options.text ?? '分割线' }}</template>
  </el-divider>
</template>
