<script setup lang="ts">
import { QuestionFilled } from '@element-plus/icons-vue'
import type { FormPropsSettings } from '../..'
import { LABEL_POSITION_OPTIONS, SIZE_OPTIONS } from './constants'

const model = defineModel<FormPropsSettings>({ default: () => ({}) })

const onChange = (key: string, val: any) => {
  switch (key) {
    case 'autoLayout': {
      if (val) {
        model.value.xl = 6
        model.value.lg = 8
        model.value.md = 12
      } else {
        model.value.xl = undefined
        model.value.lg = undefined
        model.value.md = undefined
      }
      break
    }
  }
}
</script>

<template>
  <el-form :model label-position="right" label-width="100px">
    <el-form-item label="唯一标识" prop="id" :rules="[{ required: true, message: '必填项' }]">
      <el-input v-model="model.id" disabled />
    </el-form-item>
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
      <el-input-number v-model="model.labelWidth" :min="50" :max="500" controls-position="right" />
    </el-form-item>
    <el-form-item>
      <template #label>
        自动布局
        <el-tooltip content="开启后将根据屏幕宽度自适应分栏" placement="top" effect="dark">
          <el-icon><QuestionFilled /></el-icon>
        </el-tooltip>
      </template>
      <el-switch
        v-model="model.autoLayout"
        :active-value="true"
        :inactive-value="false"
        @change="onChange('autoLayout', $event)"
      />
    </el-form-item>
    <template v-if="model.autoLayout">
      <el-form-item>
        <template #label>
          xl 栅格数
          <el-tooltip content="视口 ≥1920px 响应式栅格数" placement="top" effect="dark">
            <el-icon><QuestionFilled /></el-icon>
          </el-tooltip>
        </template>
        <el-input-number v-model="model.xl" :min="1" :max="24" controls-position="right" />
      </el-form-item>
      <el-form-item>
        <template #label>
          lg 栅格数
          <el-tooltip content="视口 ≥1200px 响应式栅格数" placement="top" effect="dark">
            <el-icon><QuestionFilled /></el-icon>
          </el-tooltip>
        </template>
        <el-input-number v-model="model.lg" :min="1" :max="24" controls-position="right" />
      </el-form-item>
      <el-form-item>
        <template #label>
          md 栅格数
          <el-tooltip content="视口 ≥992px 响应式栅格数" placement="top" effect="dark">
            <el-icon><QuestionFilled /></el-icon>
          </el-tooltip>
        </template>
        <el-input-number v-model="model.md" :min="1" :max="24" controls-position="right" />
      </el-form-item>
    </template>
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
