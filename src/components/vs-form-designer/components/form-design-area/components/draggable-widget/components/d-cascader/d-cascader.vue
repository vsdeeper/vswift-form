<script setup lang="ts">
import type { WidgetDesignData } from '@/components/vs-form-designer'
import type { DCascaderOptions } from '.'
import type { CascaderValue } from 'element-plus'

const props = defineProps<{
  designData: WidgetDesignData
}>()

const emit = defineEmits<{
  (e: 'change', val?: CascaderValue): void
}>()

const model = defineModel<string>()
const options = computed<DCascaderOptions>(() => props.designData.options)

function onChange(val?: CascaderValue) {
  emit('change', val)
}
</script>

<template>
  <el-cascader
    v-bind="options"
    v-model="model"
    :clearable="options.clearable ?? true"
    :filterable="options.filterable ?? true"
    @change="onChange"
  />
</template>
