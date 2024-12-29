<script setup lang="ts">
import type { WidgetDesignData } from '@/components/vs-form-designer'
import type { DInputOptions } from '.'

const props = defineProps<{
  designData: WidgetDesignData
}>()

const emit = defineEmits<{
  (e: 'change', val?: string): void
}>()

const model = defineModel<string>()
const options = computed<DInputOptions>(() => props.designData.options)
const slots = useSlots()

watch(
  () => options.value.defaultValue,
  val => {
    model.value = val
  },
  { immediate: true },
)

function onChange(val: string) {
  emit('change', val)
}
</script>

<template>
  <el-input v-bind="options" v-model="model" @change="onChange">
    <template v-if="slots.prefix" #prefix>
      <slot name="prefix"></slot>
    </template>
    <template v-if="slots.suffix" #suffix>
      <slot name="suffix"></slot>
    </template>
    <template v-if="slots.prepend" #prepend>
      <slot name="prepend"></slot>
    </template>
    <template v-if="slots.append" #append>
      <slot name="append"></slot>
    </template>
  </el-input>
</template>
