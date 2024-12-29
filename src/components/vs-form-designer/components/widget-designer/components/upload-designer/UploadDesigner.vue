<script setup lang="ts">
import { QuestionFilled } from '@element-plus/icons-vue'
import type { DUploadOptions } from '../../../form-design-area'
import { UPLOAD_LIST_TYPE_OPTIONS } from '../constants'
import type { WidgetDesignData } from '@/components/vs-form-designer'

const model = defineModel<WidgetDesignData<DUploadOptions>>({ default: () => ({}) })
</script>

<template>
  <el-form :model ref="formRef" label-width="110px">
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
    <el-form-item label="文件列表类型" prop="options.listType">
      <el-select v-model="model.options.listType" placeholder="请选择" clearable filterable>
        <el-option
          v-for="item in UPLOAD_LIST_TYPE_OPTIONS"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      label="上传接口"
      prop="options.api"
      :rules="[{ required: true, message: '必填项' }]"
    >
      <el-input v-model="model.options.api" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="必填" prop="options.required">
      <el-switch v-model="model.options.required" :active-value="true" :inactive-value="false" />
    </el-form-item>
    <el-form-item label="单文件限制(KB)" prop="options.singleFileSizeLimit">
      <el-input-number
        v-model="model.options.singleFileSizeLimit"
        placeholder="请输入"
        :min="0"
        :max="Number.MAX_SAFE_INTEGER"
        :step="1"
        :controls="true"
        controls-position="right"
      />
    </el-form-item>
    <el-form-item label="总文件限制(M)" prop="options.totalFileSizeLimit">
      <el-input-number
        v-model="model.options.totalFileSizeLimit"
        placeholder="请输入"
        :min="0"
        :max="Number.MAX_SAFE_INTEGER"
        :step="1"
        :controls="true"
        controls-position="right"
      />
    </el-form-item>
    <el-form-item label="最多上传(个)" prop="options.amountLimit">
      <el-input-number
        v-model="model.options.amountLimit"
        placeholder="请输入"
        :min="1"
        :max="Number.MAX_SAFE_INTEGER"
        :step="1"
        :controls="true"
        controls-position="right"
      />
    </el-form-item>
  </el-form>
</template>
