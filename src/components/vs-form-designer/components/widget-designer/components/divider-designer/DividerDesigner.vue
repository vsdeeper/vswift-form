<script setup lang="ts">
import { QuestionFilled } from '@element-plus/icons-vue'
import type { DDividerOptions } from '../../../form-design-area'
import { BORDER_STYLE_OPTIONS, CONTENT_POSITION_OPTIONS, DIRECTION_OPTIONS } from '../constants'
import type { WidgetDesignData } from '@/components/vs-form-designer'

const model = defineModel<WidgetDesignData<DDividerOptions>>({ default: () => ({}) })
</script>

<template>
  <el-form :model ref="formRef" label-width="90px">
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
    <el-form-item label="内容" prop="options.text">
      <el-input v-model="model.options.text" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="分割线方向" prop="options.direction">
      <el-select v-model="model.options.direction" placeholder="请选择" clearable filterable>
        <el-option
          v-for="item in DIRECTION_OPTIONS"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="分隔符样式" prop="options.borderStyle">
      <el-select v-model="model.options.borderStyle" placeholder="请选择" clearable filterable>
        <el-option
          v-for="item in BORDER_STYLE_OPTIONS"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="内容的位置" prop="options.contentPosition">
      <el-select v-model="model.options.contentPosition" placeholder="请选择" clearable filterable>
        <el-option
          v-for="item in CONTENT_POSITION_OPTIONS"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>
