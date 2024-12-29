<script setup lang="ts">
import { QuestionFilled } from '@element-plus/icons-vue'
import type { DDataTableOptions } from '../../../form-design-area'
import type { WidgetDesignData } from '@/components/vs-form-designer'

const model = defineModel<WidgetDesignData<DDataTableOptions>>({ default: () => ({}) })
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
    <el-form-item label="标签名称" prop="options.label">
      <el-input v-model="model.options.label" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="纵向边框" prop="options.border">
      <el-switch v-model="model.options.border" :active-value="true" :inactive-value="false" />
    </el-form-item>
    <el-form-item label="必填" prop="options.required">
      <el-switch v-model="model.options.required" :active-value="true" :inactive-value="false" />
    </el-form-item>
  </el-form>
</template>
