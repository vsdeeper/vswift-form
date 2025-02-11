<script setup lang="ts">
import type { WidgetDesignData } from '@/components/vs-form-designer'
import type { DSelectOptions } from '.'
import type { OptionsConfigItem } from '@/components/vs-form-designer/components'

const props = defineProps<{
  designData: WidgetDesignData
}>()

const emit = defineEmits<{
  (e: 'change', val?: any): void
}>()

const model = defineModel<string>()
const options = computed<DSelectOptions>(() => props.designData.options)
const optionData = ref<Record<string, any>[]>([])
const labelKey = computed(() => options.value.map?.label ?? 'label')
const valueKey = computed(() => options.value.map?.value ?? 'value')
const slots = useSlots()

watch(
  () => options.value.defaultValue,
  val => {
    model.value = val
  },
  { immediate: true },
)

watch(
  () => options.value.dataSource,
  async val => {
    if (val === 'systemApi') {
      if (!options.value.systemApi) return
      const res = await fetch(`${options.value.systemApi}`, {
        method: 'get',
      })
      const data = await res.json()
      if (Array.isArray(data)) optionData.value = data as Record<string, any>[]
      else optionData.value = (data.list ?? []) as Record<string, any>[]
    } else optionData.value = options.value.options ?? []
  },
  { immediate: true },
)

function onChange(val?: any) {
  emit('change', val)
}

function toValue(item: OptionsConfigItem) {
  return item.valueType === 'number' ? Number(item[valueKey.value]) : item[valueKey.value]
}
</script>

<template>
  <el-select
    v-bind="{ clearable: true, filterable: true, ...options }"
    v-model="model"
    @change="onChange"
  >
    <el-option
      v-for="item in optionData"
      :key="item[valueKey]"
      :label="item[labelKey]"
      :value="toValue(item)"
    />
    <template v-if="slots.header" #header>
      <slot name="header"></slot>
    </template>
    <template v-if="slots.footer" #footer>
      <slot name="footer"></slot>
    </template>
    <template v-if="slots.prefix" #prefix>
      <slot name="prefix"></slot>
    </template>
    <template v-if="slots.empty" #empty>
      <slot name="empty"></slot>
    </template>
    <template v-if="slots.tag" #tag>
      <slot name="tag"></slot>
    </template>
    <template v-if="slots.loading" #loading>
      <slot name="loading"></slot>
    </template>
    <template v-if="slots.label" #label>
      <slot name="label"></slot>
    </template>
  </el-select>
</template>
