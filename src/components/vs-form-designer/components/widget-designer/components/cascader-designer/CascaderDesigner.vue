<script setup lang="ts">
import { QuestionFilled } from '@element-plus/icons-vue'
import type { DCascaderOptions } from '../../../form-design-area'
import type { WidgetDesignData } from '@/components/vs-form-designer'
import { SYSTEM_API_OPTIONS } from '../constants'

const model = defineModel<WidgetDesignData<DCascaderOptions>>({ default: () => ({}) })
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
      <el-switch v-model="model.options.multiple" :active-value="true" :inactive-value="false" />
    </el-form-item>
    <el-form-item label="必填" prop="options.required">
      <el-switch v-model="model.options.required" :active-value="true" :inactive-value="false" />
    </el-form-item>
    <el-form-item label="数据接口" prop="options.systemApi">
      <el-select v-model="model.options.systemApi" placeholder="请选择" clearable filterable>
        <el-option
          v-for="item in SYSTEM_API_OPTIONS"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="选项名称key" prop="options.map.label">
      <el-input v-model.trim="model.options.map!.label" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="选项值key" prop="options.map.value">
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
