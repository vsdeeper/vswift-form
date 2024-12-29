<script setup lang="ts">
import { QuestionFilled } from '@element-plus/icons-vue'
import type { DSelectOptions } from '../../../form-design-area'
import type { WidgetDesignData } from '@/components/vs-form-designer'
import { SYSTEM_API_OPTIONS } from '../constants'

const model = defineModel<WidgetDesignData<DSelectOptions>>({ default: () => ({}) })
const defaultValue = ref()

watch(
  [
    defaultValue,
    () => model.value.options.optionData,
    () => model.value.options.multiple,
    () => model.value.options.dataSource,
  ],
  res => {
    const [defVal, optionData, multiple, dataSource] = res
    if (dataSource === 'customize') {
      const defValArr = optionData?.map(e => (e.valueType === 'number' ? Number(e.value) : e.value))
      if (multiple) {
        const _defVal = defVal?.filter(e => defValArr?.includes(e))
        if (_defVal?.length) {
          model.value.options.defaultValue = _defVal
        } else {
          model.value.options.defaultValue = undefined
        }
      } else {
        if (defValArr?.includes(defVal)) {
          model.value.options.defaultValue = defVal
        } else {
          model.value.options.defaultValue = undefined
        }
      }
    }
  },
  { deep: true },
)

const onChange = (key: string, val: any) => {
  switch (key) {
    case 'multiple':
      defaultValue.value = undefined
      model.value.options.defaultValue = undefined
      break
    case 'dataSource':
      defaultValue.value = undefined
      model.value.options.defaultValue = undefined
      model.value.options.optionData = []
      if (val === 'systemApi') {
        model.value.options.map = { label: 'label', value: 'value' }
      } else if (val === 'customize') {
        model.value.options.map = {}
      }
      break
  }
}
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
    <el-form-item label="占位内容" prop="options.placeholder">
      <el-input v-model="model.options.placeholder" placeholder="请输入" type="textarea" autosize />
    </el-form-item>
    <el-form-item label="多选" prop="options.multiple">
      <el-switch
        v-model="model.options.multiple"
        :active-value="true"
        :inactive-value="false"
        @change="onChange('multiple', $event)"
      />
    </el-form-item>
    <el-form-item label="必填" prop="options.required">
      <el-switch v-model="model.options.required" :active-value="true" :inactive-value="false" />
    </el-form-item>
    <el-form-item label="选项数据" prop="options.dataSource">
      <el-radio-group v-model="model.options.dataSource" @change="onChange('dataSource', $event)">
        <el-radio-button label="customize">自定义</el-radio-button>
        <el-radio-button label="systemApi">系统接口</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item
      v-if="model.options.dataSource === 'customize'"
      prop="options.optionData"
      label-position="top"
      class="option-data"
    >
      <template #label>
        <el-divider direction="horizontal">选项配置</el-divider>
      </template>
      <el-radio-group v-if="!model.options.multiple" v-model="defaultValue">
        <OptionsConfig
          v-model="model.options.optionData"
          type="select"
          :multiple="model.options.multiple"
        />
      </el-radio-group>
      <el-checkbox-group v-if="!!model.options.multiple" v-model="defaultValue">
        <OptionsConfig
          v-model="model.options.optionData"
          type="select"
          :multiple="model.options.multiple"
        />
      </el-checkbox-group>
    </el-form-item>
    <el-form-item
      v-if="model.options.dataSource === 'systemApi'"
      label="数据接口"
      prop="options.systemApi"
    >
      <el-select v-model="model.options.systemApi" placeholder="请选择" clearable filterable>
        <el-option
          v-for="item in SYSTEM_API_OPTIONS"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      v-if="model.options.dataSource === 'systemApi'"
      label="选项名称key"
      prop="options.map.label"
    >
      <el-input v-model.trim="model.options.map!.label" placeholder="请输入" />
    </el-form-item>
    <el-form-item
      v-if="model.options.dataSource === 'systemApi'"
      label="选项值key"
      prop="options.map.value"
    >
      <el-input v-model.trim="model.options.map!.value" placeholder="请输入" />
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.vs-form-item.option-data {
  .vs-radio-group {
    flex: 1;
  }
  .vs-checkbox-group {
    flex: 1;
    line-height: 32px;
  }
  :deep(.vs-form-item__label) {
    width: 100%;
    padding: 0;
  }
}
</style>
