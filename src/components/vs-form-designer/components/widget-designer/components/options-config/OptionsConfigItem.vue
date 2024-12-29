<script setup lang="ts">
import { Minus } from '@element-plus/icons-vue'
import type { OptionsConfigItem } from '../..'

defineProps<{
  index: number
}>()

const emit = defineEmits<{
  (e: 'delete', idx: number): void
  (e: 'change', data: OptionsConfigItem): void
}>()

const model = defineModel<OptionsConfigItem>({ default: () => ({}) })
</script>

<template>
  <el-input v-model.trim="model.value" placeholder="请输入" style="width: 160px">
    <template #prepend>
      <el-select
        v-model="model.valueType"
        placeholder="类型"
        style="width: 90px"
        @change="emit('change', model)"
      >
        <el-option label="数字" value="number" />
        <el-option label="字符串" value="string" />
      </el-select>
    </template>
  </el-input>
  <el-input v-model="model.label" placeholder="请输入" style="flex: 1; margin-left: 5px" />
  <el-button
    type="danger"
    size="small"
    :icon="Minus"
    circle
    @click="emit('delete', index)"
    style="margin-left: 5px"
  ></el-button>
</template>
