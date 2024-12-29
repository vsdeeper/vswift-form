<script setup lang="ts">
import { QuestionFilled } from '@element-plus/icons-vue'
import type { DTextOptions } from '../../../form-design-area'
import { SIZE_OPTIONS, TYPE_OPTIONS } from '../constants'
import type { WidgetDesignData } from '@/components/vs-form-designer'

const model = defineModel<WidgetDesignData<DTextOptions>>({ default: () => ({}) })
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
      <el-input v-model="model.options.text" placeholder="请输入" type="textarea" autosize />
    </el-form-item>
    <el-form-item label="类型" prop="options.type">
      <el-select v-model="model.options.type" placeholder="请选择" clearable filterable>
        <el-option
          v-for="item in TYPE_OPTIONS"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="大小" prop="options.size">
      <el-select v-model="model.options.size" placeholder="请选择" clearable filterable>
        <el-option
          v-for="item in SIZE_OPTIONS"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="显示省略号" prop="options.truncated">
      <el-switch v-model="model.options.truncated" :active-value="true" :inactive-value="false" />
    </el-form-item>
    <el-form-item label="最大行数" prop="options.lineClamp">
      <el-input-number
        v-model="model.options.lineClamp as number"
        :min="1"
        :max="Number.MAX_SAFE_INTEGER"
        :step="1"
        :controls="true"
        controls-position="right"
      />
    </el-form-item>
  </el-form>
</template>
