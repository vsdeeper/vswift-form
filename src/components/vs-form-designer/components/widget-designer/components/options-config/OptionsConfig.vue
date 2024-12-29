<script setup lang="ts">
import type { OptionsConfigItem } from '.'
import { default as ConfigItem } from './OptionsConfigItem.vue'

defineProps<{
  type: 'radio' | 'checkbox' | 'select'
  multiple?: boolean
}>()

const model = defineModel<OptionsConfigItem[]>({ default: () => [] })

function onDelete(idx: number) {
  model.value.splice(idx, 1)
}

function onAdd() {
  if (!model.value) model.value = []
  model.value.push({ valueType: 'number' })
}

function onChange(key: string, data: any) {
  switch (key) {
    case 'valueType': {
      data.value = undefined
      break
    }
  }
}

function toValue(item: OptionsConfigItem) {
  return item.valueType === 'number' ? Number(item.value) : item.value
}
</script>

<template>
  <div class="options-config">
    <el-row v-if="model.length" class="header" align="middle">
      <div class="label">选项值</div>
      <div class="label">选项名称</div>
    </el-row>
    <el-row v-for="(item, index) in model" :key="'item' + index" align="middle">
      <el-radio v-if="type === 'radio' || (type === 'select' && !multiple)" :value="toValue(item)">
        <ConfigItem
          v-model="model[index]"
          :index
          @change="onChange('valueType', $event)"
          @delete="onDelete($event)"
        />
      </el-radio>
      <el-checkbox
        v-else-if="type === 'checkbox' || (type === 'select' && !!multiple)"
        :value="toValue(item)"
      >
        <ConfigItem
          v-model="model[index]"
          :index
          @change="onChange('valueType', $event)"
          @delete="onDelete($event)"
        />
      </el-checkbox>
    </el-row>
    <div v-if="!model.length" class="nodata">暂未配置</div>
    <div class="btns">
      <el-button type="primary" @click="onAdd"> + 新增 </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.options-config {
  width: 100%;
  box-sizing: border-box;
  .header {
    .label {
      display: flex;
      align-items: center;
      margin-left: 25px;
      font-size: var(--vs-form-label-font-size);
      color: var(--vs-text-color-regular);
      &:first-child {
        width: 140px;
      }
    }
  }
  .vs-row + .vs-row {
    margin-top: 5px;
  }
  .btns {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  }
  :deep(.vs-radio__label) {
    display: flex;
    align-items: center;
  }
  :deep(.vs-checkbox__label) {
    display: flex;
    align-items: center;
  }
}
.nodata {
  font-size: 14px;
  color: var(--vs-color-info);
  padding: 6px;
}
</style>
