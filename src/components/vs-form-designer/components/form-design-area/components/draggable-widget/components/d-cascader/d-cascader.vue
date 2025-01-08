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
const optionData = ref<Record<string, any>[]>([])
const labelKey = computed(() => options.value.map?.label ?? 'label')
const valueKey = computed(() => options.value.map?.value ?? 'value')
const childrenKey = computed(() => options.value.map?.children ?? 'children')

watch(
  () => options.value.systemApi,
  async val => {
    if (!val) return
    const res = await fetch(`${options.value.systemApi}`, {
      method: 'get',
    })
    const data = await res.json()
    if (Array.isArray(data)) optionData.value = data as Record<string, any>[]
    else optionData.value = (data.list ?? []) as Record<string, any>[]
  },
  { immediate: true },
)

function onChange(val?: CascaderValue) {
  emit('change', val)
}
</script>

<template>
  <el-cascader
    v-bind="{
      clearable: true,
      filterable: true,
      options: optionData,
      props: { label: labelKey, value: valueKey, children: childrenKey },
      ...options,
    }"
    v-model="model"
    @change="onChange"
  />
</template>
