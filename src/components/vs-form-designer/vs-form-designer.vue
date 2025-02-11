<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import {
  activeWidgetDesignData,
  initFormDesignData,
  setActiveWidgetDesignData,
  setFormDesignData,
} from '@/stores'
import { Delete, View } from '@element-plus/icons-vue'
import type { ImportJsonInstance, ExportJsonInstance, FormPreviewInstance } from './components'
import { deleteExtraFieldsReplacer, type FormDesignData } from '.'

defineProps<{
  height?: string
}>()

const model = ref<FormDesignData>(initFormDesignData())
const FormPreviewRef = ref<FormPreviewInstance>()
const ImportJsonRef = ref<ImportJsonInstance>()
const ExportJsonRef = ref<ExportJsonInstance>()

watch(
  model,
  val => {
    setFormDesignData(val)
  },
  { immediate: true },
)

const onClear = () => {
  model.value.widgetList = []
}

const onPreview = () => {
  FormPreviewRef.value?.open(model.value)
}

const onImportJson = () => {
  ImportJsonRef.value?.open(JSON.stringify(model.value, deleteExtraFieldsReplacer, 2))
}

const onImportSuccess = (val: FormDesignData) => {
  model.value = val
  setActiveWidgetDesignData(undefined)
}

const onExportJson = () => {
  ExportJsonRef.value?.open(JSON.stringify(model.value, deleteExtraFieldsReplacer, 2))
}

const getModel = (): FormDesignData => {
  return JSON.parse(JSON.stringify(model.value, deleteExtraFieldsReplacer))
}

const setModel = (data?: FormDesignData) => {
  model.value = data ?? initFormDesignData()
  setActiveWidgetDesignData(undefined)
}

defineExpose({
  getModel,
  setModel,
})
</script>

<template>
  <el-config-provider :locale="zhCn" namespace="vs">
    <el-container class="vs-form-designer" :style="{ height: height ?? '650px' }">
      <el-aside class="left-side" width="320px">
        <el-tabs model-value="widget">
          <el-tab-pane label="组件" name="widget">
            <el-scrollbar>
              <WidgetOptions />
            </el-scrollbar>
          </el-tab-pane>
          <!-- <el-tab-pane label="表单模板" name="form-template">
          <el-scrollbar> 表单模板 </el-scrollbar>
        </el-tab-pane> -->
        </el-tabs>
      </el-aside>
      <el-main>
        <div class="function-bar">
          <el-button type="primary" text :icon="View" @click="onPreview">预览</el-button>
          <el-button type="primary" text @click="onImportJson">导入JSON</el-button>
          <el-button type="primary" text @click="onExportJson">导出JSON</el-button>
          <el-popconfirm title="确认清空吗？" @confirm="onClear">
            <template #reference>
              <el-button type="danger" text :icon="Delete">清空</el-button>
            </template>
          </el-popconfirm>
        </div>
        <el-scrollbar>
          <FormDesignArea v-model="model.widgetList" :form-props="model.form" />
        </el-scrollbar>
      </el-main>
      <el-aside class="right-side" width="320px">
        <el-tabs model-value="widget-settings">
          <el-tab-pane label="组件设置" name="widget-settings">
            <el-scrollbar>
              <WidgetDesigner v-model="activeWidgetDesignData" />
            </el-scrollbar>
          </el-tab-pane>
          <el-tab-pane label="表单设置" name="form-settings">
            <el-scrollbar>
              <FormDesigner v-model="model.form" />
            </el-scrollbar>
          </el-tab-pane>
        </el-tabs>
      </el-aside>

      <FormPreview ref="FormPreviewRef" />
      <ImportJson ref="ImportJsonRef" @success="onImportSuccess" />
      <ExportJson ref="ExportJsonRef" />
    </el-container>
  </el-config-provider>
</template>

<style lang="scss" scoped>
.vs-form-designer {
  overflow: auto;
  div[class*='-tabs--top'] {
    height: 100%;
  }
  :deep(div[class*='-tabs__content']) {
    height: calc(100% - 55px);
  }
  :deep(div[class*='-tab-pane']) {
    height: 100%;
  }
  .left-side {
    :deep(div[class*='-scrollbar__view']) {
      padding: 0 10px;
    }
    :deep(div[class*='-tabs__content']) {
      padding: 0;
    }
  }
  .right-side {
    :deep(div[class*='-scrollbar__view']) {
      padding: 0 10px;
    }
    :deep(div[class*='-tabs__content']) {
      padding: 0;
    }
  }
  main[class*='-main'] {
    --vs-main-padding: 0;
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 400px;
    :deep(.form-design-area) {
      position: relative;
      height: 100%;
      box-sizing: border-box;
    }
    .function-bar {
      display: flex;
      align-items: flex-end;
      height: 40px;
      button[class*='-button'] + button[class*='-button'] {
        margin-left: 0;
      }
    }
    & > :deep(div[class*='-scrollbar']) {
      box-sizing: border-box;
      border: 3px dotted var(--vs-border-color-light);
      background-color: var(--vs-bg-color-page);
      & > div[class*='-scrollbar__wrap'] {
        height: calc(100% - 16px);
        margin: 8px;
        background-color: #fff;
      }
      div[class*='-scrollbar__view'] {
        height: 100%;
        box-sizing: border-box;
      }
    }
  }
}
</style>
