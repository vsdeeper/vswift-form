<script setup lang="ts">
import { QuestionFilled } from '@element-plus/icons-vue'
import type { DInputOptions } from '../../../form-design-area'
import { INPUT_TYPE_OPTIONS, PATTERN_OPTIONS } from '../constants'
import type { WidgetDesignData } from '@/components/vs-form-designer'
import { useFormDesignerStore } from '@/stores'

const model = defineModel<WidgetDesignData<DInputOptions>>({ default: () => ({}) })

const showColumnWidth = (id: string) => {
  const { formDesignData } = useFormDesignerStore()
  const filterTable = formDesignData.widgetList.filter(e => e.type === 'data-table')
  return filterTable.some(e => e.widgetList?.some(a => a.id === id))
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
    <el-form-item label="类型" prop="options.type">
      <el-select v-model="model.options.type" placeholder="请选择" clearable filterable>
        <el-option
          v-for="item in INPUT_TYPE_OPTIONS"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      v-if="model.options.type === 'password'"
      label="显示切换图标"
      prop="options.showPassword"
    >
      <el-switch
        v-model="model.options.showPassword"
        :active-value="true"
        :inactive-value="false"
      />
    </el-form-item>
    <el-form-item label="默认值" prop="options.defaultValue">
      <el-input v-model="model.options.defaultValue" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="必填" prop="options.required">
      <el-switch v-model="model.options.required" :active-value="true" :inactive-value="false" />
    </el-form-item>
    <el-form-item label="最大输入长度" prop="options.maxlength">
      <el-input-number
        v-model="model.options.maxlength as number"
        placeholder="请输入"
        :min="1"
        :max="Number.MAX_SAFE_INTEGER"
        :step="1"
        :controls="true"
        controls-position="right"
      />
    </el-form-item>
    <el-form-item label="显示统计数字" prop="options.showWordLimit">
      <el-switch
        v-model="model.options.showWordLimit"
        :active-value="true"
        :inactive-value="false"
      />
    </el-form-item>
    <el-form-item label="显示清除按钮" prop="options.clearable">
      <el-switch v-model="model.options.clearable" :active-value="true" :inactive-value="false" />
    </el-form-item>
    <el-form-item prop="options.autosize">
      <template #label>
        高度自适应
        <el-tooltip content="仅 type 为 'textarea' 时生效" placement="top" effect="dark">
          <el-icon><QuestionFilled /></el-icon>
        </el-tooltip>
      </template>
      <el-switch
        v-model="model.options.autosize as boolean"
        :active-value="true"
        :inactive-value="false"
      />
    </el-form-item>
    <el-form-item prop="options.pattern">
      <template #label>
        正则校验
        <el-tooltip content="支持输入正则，例：^(0|[1-9][0-9]*)$" placement="top" effect="dark">
          <el-icon><QuestionFilled /></el-icon>
        </el-tooltip>
      </template>
      <el-select
        v-model="model.options.pattern"
        placeholder="请选择"
        allow-create
        clearable
        filterable
      >
        <el-option
          v-for="item in PATTERN_OPTIONS"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item v-if="model.options.pattern" label="校验失败提示" prop="options.patternMessage">
      <el-input v-model="model.options.patternMessage" placeholder="请输入" clearable />
    </el-form-item>
    <el-form-item v-if="showColumnWidth(model.id)" prop="options.columnWidth">
      <template #label>
        列宽度
        <el-tooltip content="在 table 列中所占的宽度" placement="top" effect="dark">
          <el-icon><QuestionFilled /></el-icon>
        </el-tooltip>
      </template>
      <el-input-number
        v-model="model.options.columnWidth"
        placeholder="请输入"
        :controls="true"
        controls-position="right"
      />
    </el-form-item>
    <el-form-item v-if="showColumnWidth(model.id)" prop="options.columnMinWidth">
      <template #label>
        列最小宽度
        <el-tooltip content="在 table 列中所占的最小宽度" placement="top" effect="dark">
          <el-icon><QuestionFilled /></el-icon>
        </el-tooltip>
      </template>
      <el-input-number
        v-model="model.options.columnMinWidth"
        placeholder="请输入"
        :controls="true"
        controls-position="right"
      />
    </el-form-item>
  </el-form>
</template>
