<script setup lang="ts">
import type { WidgetDesignData } from '@/components/vs-form-designer'
import type { DRadioOptions } from '.'
import type { OptionsConfigItem } from '@/components/vs-form-designer/components'

const props = defineProps<{
  designData: WidgetDesignData
}>()

const emit = defineEmits<{
  (e: 'change', val?: string | number | boolean): void
}>()

const model = defineModel<string>()
const options = computed<DRadioOptions>(() => props.designData.options)
const labelKey = computed(() => options.value.map?.label ?? 'label')
const valueKey = computed(() => options.value.map?.value ?? 'value')

watch(
  () => options.value.defaultValue,
  val => {
    model.value = val
  },
  { immediate: true },
)

function onChange(val?: string | number | boolean) {
  emit('change', val)
}

function toValue(item: OptionsConfigItem) {
  return item.valueType === 'number' ? Number(item[valueKey.value]) : item[valueKey.value]
}
</script>

<template>
  <el-radio-group
    v-if="options.optionData?.length"
    v-bind="options"
    v-model="model"
    @change="onChange"
  >
    <template v-if="options.radioType === 'button'">
      <el-radio-button
        v-for="item in options.optionData"
        :key="item[valueKey]"
        :label="item[labelKey]"
        :value="toValue(item)"
      >
        <template #default>{{ item[labelKey] }}</template>
      </el-radio-button>
    </template>
    <template v-else>
      <el-radio
        v-for="item in options.optionData"
        :key="item[valueKey]"
        :label="item[labelKey]"
        :value="toValue(item)"
      >
        <template #default>{{ item[labelKey] }}</template>
      </el-radio>
    </template>
  </el-radio-group>
  <el-text v-else type="info">暂未配置</el-text>
</template>
