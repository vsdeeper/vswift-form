<script setup lang="ts">
import { QuestionFilled } from '@element-plus/icons-vue'
import type { FormDesign } from '../..'
import { LABEL_POSITION_OPTIONS, SIZE_OPTIONS } from './constants'

const model = defineModel<FormDesign>({ default: () => ({}) })
</script>

<template>
  <el-form :model label-position="right" label-width="100px">
    <el-form-item>
      <template #label>
        标签位置
        <el-tooltip content="表单渲染时生效" placement="top" effect="dark">
          <el-icon><QuestionFilled /></el-icon>
        </el-tooltip>
      </template>
      <el-select v-model="model.labelPosition" placeholder="请选择" clearable filterable>
        <el-option
          v-for="item in LABEL_POSITION_OPTIONS"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="表单组件尺寸">
      <el-select v-model="model.size" placeholder="请选择" clearable filterable>
        <el-option
          v-for="item in SIZE_OPTIONS"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="标签宽度">
      <el-input-number
        v-model="model.labelWidth as number"
        :min="50"
        :max="500"
        controls-position="right"
      />
    </el-form-item>
    <el-form-item>
      <template #label>
        自动布局
        <el-tooltip content="开启后将根据屏幕宽度自适应分栏" placement="top" effect="dark">
          <el-icon><QuestionFilled /></el-icon>
        </el-tooltip>
      </template>
      <el-switch v-model="model.autoLayout" :active-value="true" :inactive-value="false" />
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.vs-input-number {
  width: 100%;
  :deep(.vs-input__inner) {
    text-align: left;
  }
}
:deep(.vs-form-item__label) {
  align-items: center;
  & > .vs-icon.vs-tooltip__trigger {
    margin-left: 3px;
  }
}
</style>
