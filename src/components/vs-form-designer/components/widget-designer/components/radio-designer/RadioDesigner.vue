<script setup lang="ts">
import { QuestionFilled } from '@element-plus/icons-vue'
import type { DRadioOptions } from '../../../form-design-area'
import type { WidgetDesignData } from '@/components/vs-form-designer'

const model = defineModel<WidgetDesignData<DRadioOptions>>({ default: () => ({}) })
const defaultValue = ref()

watch(
  [defaultValue, () => model.value.options.optionData],
  res => {
    const [defVal, optionData] = res
    const defValArr = optionData?.map(e => (e.valueType === 'number' ? Number(e.value) : e.value))
    if (defValArr?.includes(defVal)) {
      model.value.options.defaultValue = defVal
    } else {
      model.value.options.defaultValue = undefined
    }
  },
  { deep: true },
)
</script>

<template>
  <el-form :model ref="formRef" label-width="100px">
    <el-form-item label="唯一标识" prop="id" :rules="[{ required: true, message: '必填项' }]">
      <el-input :model-value="model.id" placeholder="请输入" disabled />
    </el-form-item>
    <el-form-item prop="idAlias">
      <template #label>
        ID别名
        <el-tooltip
          content="表单的 value 值对应的 key，默认为唯一标识"
          placement="top"
          effect="dark"
        >
          <el-icon><QuestionFilled /></el-icon>
        </el-tooltip>
      </template>
      <el-input v-model="model.idAlias" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="标签名称" prop="options.label">
      <el-input v-model="model.options.label" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="必填" prop="options.required">
      <el-switch v-model="model.options.required" :active-value="true" :inactive-value="false" />
    </el-form-item>
    <el-form-item prop="options.optionData" label-position="top" class="option-data">
      <template #label>
        <el-divider direction="horizontal">选项配置</el-divider>
      </template>
      <el-radio-group v-model="defaultValue">
        <OptionsConfig v-model="model.options.optionData" type="radio" />
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.vs-form-item.option-data {
  .vs-radio-group {
    flex: 1;
  }
  :deep(.vs-form-item__label) {
    width: 100%;
    padding: 0;
  }
}
</style>
