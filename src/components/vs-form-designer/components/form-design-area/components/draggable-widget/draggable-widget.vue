<script setup lang="ts">
import draggable from 'vuedraggable'
import type { FormDesignData, WidgetDesignData, WidgetType } from '@/components/vs-form-designer'
import { DComponent } from './components'
import { pascal } from 'radash'
import { useFormDesignerStore } from '@/stores'
import { OPERATE_OPTIONS } from './constants'
import { genWidgetId } from '@/components/vs-form-designer/util'
import { ElMessage } from 'element-plus'

const props = defineProps<{
  where?: WidgetType // 标明被哪个widget-field组件引用，做逻辑区分
  parentNode?: WidgetDesignData
}>()

const widgetList = defineModel<WidgetDesignData[]>('widgetList', { default: () => [] })
const formData = defineModel<any>('formData')
const canDrag = ref(false)
const { setActiveWidgetDesignData } = useFormDesignerStore()

function onDragChange(...args: any[]) {
  console.log('onDragChange', args, widgetList.value)
  const { added }: { added: { element: WidgetDesignData } } = args[0]
  if (added) {
    // 新增操作
    if (interceptSomeWidgetPutInAnotherWidget(added.element, props.parentNode, props.where)) return
    setActiveWidgetDesignData(widgetList.value.find(e => e.id === added.element.id)!)
  }
}

function onOperate(key: string, val: any) {
  switch (key) {
    case 'click-widget-field': {
      setActiveWidgetDesignData(val)
      break
    }
    case 'copy': {
      const copyItem: WidgetDesignData = JSON.parse(JSON.stringify(widgetList.value[val]))
      recurWidgetList(copyItem, item => {
        item.id = genWidgetId(item.type)
      })
      widgetList.value.splice(val + 1, 0, copyItem)
      setActiveWidgetDesignData(copyItem)
      break
    }
    case 'delete': {
      widgetList.value.splice(val, 1)
      if (
        widgetList.value.length ===
        0 /** 控件删完，检查是否有父级，有则选中父级，无则清空当前设计数据 */
      ) {
        if (props.parentNode) {
          setActiveWidgetDesignData(props.parentNode)
        } else {
          setActiveWidgetDesignData(undefined)
        }
      } else {
        if (widgetList.value.length === val /** 删的是最后一项，选中控件列表第一项 */) {
          setActiveWidgetDesignData(widgetList.value[0])
        } else {
          setActiveWidgetDesignData(widgetList.value[val])
        }
      }
      break
    }
  }
}

/**
 * 递归widgetList
 * @param data
 * @param callback
 */
function recurWidgetList(data: WidgetDesignData, handler: (item: WidgetDesignData) => void) {
  handler(data)
  data.widgetList?.forEach(item => {
    recurWidgetList(item, handler)
  })
}

/**
 * 拦截某些控件放进其他控件的行为
 * @param addItem
 * @param formDesignData
 * @param where
 */
function interceptSomeWidgetPutInAnotherWidget(
  addedItem: WidgetDesignData,
  parentNode?: WidgetDesignData,
  where?: WidgetType,
) {
  if (!parentNode || !where) return
  switch (where) {
    case 'data-table': {
      const typeToMessages: [WidgetType, string][] = [
        ['data-table', '不支持表格嵌套'],
        ['recursive-area', '不支持递归域放入表格中'],
        ['text', '不支持文本放入表格中'],
        ['divider', '不支持分割线放入表格中'],
        ['radio', '不支持单选框放入表格中'],
        ['checkbox', '不支持多选框放入表格中'],
        ['upload', '不支持上传放入表格中'],
      ]
      const messageMap = new Map(typeToMessages)
      if (typeToMessages.some(e => e[0] === addedItem.type)) {
        ElMessage.warning(messageMap.get(addedItem.type))
        const index = parentNode.widgetList?.findIndex(e => e.id === addedItem.id)
        parentNode.widgetList?.splice(index!, 1)
        return true
      } else return false
    }
    default: {
      return false
    }
  }
}
</script>

<template>
  <div v-if="!widgetList?.length" class="note">请从左侧列表中拖动组件放置于此处</div>
  <draggable
    class="draggable-widget"
    :list="widgetList"
    group="draggable-widget-option"
    :animation="300"
    :component-data="{ type: 'transition-group' }"
    item-key="id"
    @start="canDrag = true"
    @end="canDrag = false"
    @change="onDragChange"
  >
    <template #item="{ element: item, index }">
      <div
        class="widget-field"
        :class="{ selected: item.__selected }"
        @click.stop="onOperate('click-widget-field', item)"
      >
        <el-form-item
          v-if="['data-table', 'recursive-area'].includes(item.type)"
          :label="item.options?.label"
          :rules="[{ required: item.options?.required, message: '必填项' }]"
        >
          <component
            :is="DComponent[pascal(item.type)]"
            v-model:widget-list="item.widgetList"
            v-model:form-data="formData![item.id]"
            :parent-node="item"
          />
        </el-form-item>
        <component
          v-else-if="['text', 'divider'].includes(item.type)"
          :is="DComponent[pascal(item.type)]"
          :design-data="item"
        />
        <el-form-item
          v-else
          :label="item.options?.label"
          :rules="[{ required: item.options?.required, message: '必填项' }]"
        >
          <component
            :is="DComponent[pascal(item.type)]"
            v-model="formData![item.id]"
            :design-data="item"
          />
        </el-form-item>
        <div v-if="item.__selected" class="operate-btns">
          <el-tooltip
            v-for="operateItem in OPERATE_OPTIONS"
            :key="operateItem.value"
            :content="operateItem.label"
            placement="top"
          >
            <el-button
              type="primary"
              size="small"
              :icon="operateItem.icon"
              @click.stop="onOperate(operateItem.value, index)"
            />
          </el-tooltip>
        </div>
      </div>
    </template>
  </draggable>
</template>

<style lang="scss" scoped>
.note {
  position: absolute;
  top: 30px;
  left: 30px;
  right: 30px;
  font-size: 20px;
  line-height: 1.5;
  color: #ccc;
  text-align: center;
  pointer-events: none;
}
.draggable-widget {
  height: 100%;
  box-sizing: border-box;
  .widget-field {
    position: relative;
    border: 3px solid #fff;
    background-color: #fff;
    padding: 8px;
    div[class*='-cascader '],
    div[class*='-date-editor '],
    div[class*='-input-number'] {
      width: 100%;
    }
    &.selected {
      border-color: var(--vs-color-primary);
    }
    & > .operate-btns {
      position: absolute;
      right: -3px;
      top: -3px;
      z-index: 1;
      line-height: 1;
      .vs-button {
        padding: 5px 6px;
        border-radius: 0;
        & + .vs-button {
          margin-left: 0;
        }
      }
    }
  }
  :deep(.item.sortable-chosen) {
    height: 0;
    overflow: hidden;
    border-width: 3px 0 0 0;
    border-style: solid;
    border-color: var(--vs-color-primary);
    box-sizing: border-box;
  }
}
</style>
