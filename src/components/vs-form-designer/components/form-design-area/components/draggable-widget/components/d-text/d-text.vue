<script setup lang="ts">
import type { WidgetDesignData } from '@/components/vs-form-designer'
import type { DTextOptions } from '.'

const props = defineProps<{
  designData: WidgetDesignData
}>()

const options = computed<DTextOptions>(() => props.designData.options)
</script>

<template>
  <el-text v-bind="options" :type="options.type ?? 'info'">
    {{ options.text }}
  </el-text>
</template>
