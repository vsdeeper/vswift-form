<script setup lang="ts">
import type { WidgetDesignData } from '@/components/vs-form-designer'
import FormItem from './FormItem.vue'
import { SemiSelect } from '@element-plus/icons-vue'

const props = defineProps<{
  designData: WidgetDesignData
  formItemProp?: string
}>()

const model = defineModel<Record<string, any>>({ default: () => ({}) })
const widgetList = computed(() => props.designData.widgetList)
const id = computed(() => props.designData.id)

const onAdd = () => {
  if (!model.value[id.value]) model.value[id.value] = []
  model.value[id.value].push({})
}

const onDelete = (index: number) => {
  model.value[id.value].splice(index, 1)
}

const genFormItemProp = (id: string, index: number) => {
  return props.formItemProp ? `${props.formItemProp}.${id}.${index}` : `${id}.${index}`
}
</script>

<template>
  <div class="recursive-area-render">
    <el-card v-for="(item, index) in model[id]" :key="'card' + index" shadow="hover">
      <template #header>
        <div>{{ index + 1 }}-{{ designData.options.label }}</div>
        <el-button type="danger" size="small" :icon="SemiSelect" circle @click="onDelete(index)" />
      </template>
      <FormItem
        v-for="item1 in widgetList"
        :key="item1.id"
        :design-data="item1"
        :form-item-prop="genFormItemProp(id, index)"
        where="recursive-area"
        v-model="model[id][index]"
      />
    </el-card>
    <el-divider v-if="!model[id]?.length">暂无数据</el-divider>
    <el-button type="primary" @click="onAdd">+ 新增</el-button>
  </div>
</template>

<style lang="scss" scoped>
.recursive-area-render {
  width: 100%;
  .vs-card {
    & + .vs-card {
      margin-top: 8px;
    }
    :deep(.vs-card__header) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: 1;
      padding: 12px;
    }
    .vs-form-item {
      margin-bottom: 18px;
    }
  }
  & > .vs-button {
    width: 100%;
    margin-top: 12px;
  }
}
.nodata {
  font-size: 14px;
  color: var(--vs-color-info);
  padding: 6px;
}
</style>
