<script setup lang="ts">
import type { WidgetDesignData } from '@/components/vs-form-designer'
import type { DDatetimePickerOptions } from '.'

const props = defineProps<{
  designData: WidgetDesignData
}>()

const emit = defineEmits<{
  (e: 'change', val?: any): void
}>()

const model = defineModel<number>()
const options = computed<DDatetimePickerOptions>(() => props.designData.options)

function onChange(val: any) {
  emit('change', val)
}
</script>

<template>
  <el-date-picker
    :type="options.type ?? 'datetime'"
    value-format="x"
    v-bind="options"
    v-model="model"
    @change="onChange"
  />
</template>
