<script setup lang="ts">
import type { FormItemRule } from 'element-plus'
import type { WidgetDesignData } from '../..'
import { DComponent } from '../form-design-area'
import { pascal } from 'radash'

const props = defineProps<{
  designData: WidgetDesignData
  formItemProp?: string
  where?: 'data-table' | 'recursive-area'
}>()

const model = defineModel<Record<string, any>>({ default: () => ({}) })

const genFormItemRules = (options?: Record<string, any>) => {
  const rules: FormItemRule[] = []
  if (options?.required) {
    rules.push({ required: true, message: '必填项' })
  }
  if (options?.pattern) {
    rules.push({
      pattern: new RegExp(options.pattern),
      message: options?.patternMessage ?? '格式错误',
    })
  }
  return rules
}

const genFormItemProp = (id: string) => {
  return props.formItemProp ? `${props.formItemProp}.${id}` : id
}
</script>

<template>
  <el-form-item
    v-if="designData.type === 'data-table'"
    :label="designData.options?.label"
    :rules="genFormItemRules(designData.options)"
    :prop="genFormItemProp(designData.id)"
  >
    <DataTableRender v-model="model" :design-data />
  </el-form-item>
  <el-form-item
    v-else-if="designData.type === 'recursive-area'"
    :label="designData.options?.label"
    :rules="genFormItemRules(designData.options)"
    :prop="genFormItemProp(designData.id)"
  >
    <!-- <component
      :is="DComponent[pascal(designData.type)]"
      :widget-list="designData.widgetList"
      v-model="model![designData.id]"
    /> -->
    <RecursiveAreaRender v-model="model" :design-data :form-item-prop />
  </el-form-item>
  <component
    v-else-if="['text', 'divider'].includes(designData.type)"
    :is="DComponent[pascal(designData.type)]"
    :design-data
  />
  <el-form-item
    v-else
    :label="where === 'data-table' ? '' : designData.options?.label"
    :rules="genFormItemRules(designData.options)"
    :prop="genFormItemProp(designData.id)"
    :show-message="where !== 'data-table'"
  >
    <component
      :is="DComponent[pascal(designData.type)]"
      v-model="model![designData.id]"
      :design-data
    />
  </el-form-item>
</template>
