<script setup lang="ts">
import type { WidgetDesignData } from '@/components/vs-form-designer'
import type { DCheckboxOptions } from '.'
import type { CheckboxGroupValueType, CheckboxValueType } from 'element-plus'
import type { OptionsConfigItem } from '@/components/vs-form-designer/components'

const props = defineProps<{
  designData: WidgetDesignData
}>()

const emit = defineEmits<{
  (e: 'change', val?: CheckboxValueType[]): void
}>()

const model = defineModel<CheckboxGroupValueType>()
const options = computed<DCheckboxOptions>(() => props.designData.options)
const labelKey = computed(() => options.value.map?.label ?? 'label')
const valueKey = computed(() => options.value.map?.value ?? 'value')

watch(
  () => options.value.defaultValue,
  val => {
    model.value = val
  },
  { immediate: true },
)

function onChange(val?: CheckboxValueType[]) {
  emit('change', val)
}

function toValue(item: OptionsConfigItem) {
  return item.valueType === 'number' ? Number(item[valueKey.value]) : item[valueKey.value]
}
</script>

<template>
  <el-checkbox-group
    v-if="options.optionData?.length"
    v-bind="options"
    v-model="model"
    @change="onChange"
  >
    <template v-if="options.checkboxType === 'button'">
      <el-checkbox-button
        v-for="item in options.optionData"
        :key="item[valueKey]"
        :label="item[labelKey]"
        :value="toValue(item)"
      ></el-checkbox-button>
    </template>
    <template v-else>
      <el-checkbox
        v-for="item in options.optionData"
        :key="item[valueKey]"
        :label="item[labelKey]"
        :value="toValue(item)"
      >
        <template #default>{{ item[labelKey] }}</template>
      </el-checkbox>
    </template>
  </el-checkbox-group>
  <el-text v-else type="info">暂未配置</el-text>
</template>
