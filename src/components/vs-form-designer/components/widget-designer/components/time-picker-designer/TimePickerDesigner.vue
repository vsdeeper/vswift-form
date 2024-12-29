<script setup lang="ts">
import { QuestionFilled } from '@element-plus/icons-vue'
import type { DTimePickerOptions } from '../../../form-design-area'
import type { WidgetDesignData } from '@/components/vs-form-designer'
import { useFormDesignerStore } from '@/stores'

const model = defineModel<WidgetDesignData<DTimePickerOptions>>({ default: () => ({}) })

const showColumnWidth = (id: string) => {
  const { formDesignData } = useFormDesignerStore()
  const filterTable = formDesignData.widgetList.filter(e => e.type === 'data-table')
  return filterTable.some(e => e.widgetList?.some(a => a.id === id))
}

const onChange = (key: string, val: any) => {
  switch (key) {
    case 'isRange':
      if (val) {
        model.value.options.startPlaceholder = '开始时间'
        model.value.options.endPlaceholder = '结束时间'
      } else {
        model.value.options.placeholder = '请选择时间'
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
    <el-form-item label="时间范围" prop="options.isRange">
      <el-switch
        v-model="model.options.isRange"
        :active-value="true"
        :inactive-value="false"
        @change="onChange('isRange', $event)"
      />
    </el-form-item>
    <el-form-item label="必填" prop="options.required">
      <el-switch v-model="model.options.required" :active-value="true" :inactive-value="false" />
    </el-form-item>
    <el-form-item label="显示清除按钮" prop="options.clearable">
      <el-switch v-model="model.options.clearable" :active-value="true" :inactive-value="false" />
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
