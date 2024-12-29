<script setup lang="ts">
import { useFormDesignerStore } from '@/stores'
import { DesignerComponent } from '.'
import { pascal } from 'radash'
import type { WidgetDesignData } from '../..'

const model = defineModel<WidgetDesignData>()
const type = computed(() => useFormDesignerStore().activeWidgetDesignData?.type ?? 'unknown')
</script>

<template>
  <div class="widget-design-area">
    <component :is="DesignerComponent[pascal(type)]" v-model="model" />
  </div>
</template>

<style lang="scss" scoped>
.widget-design-area {
  :deep(.vs-form-item__label) {
    align-items: center;
    & > .vs-icon.vs-tooltip__trigger {
      margin-left: 3px;
    }
  }
  :deep(.vs-input-number) {
    width: 100%;
    .vs-input__inner {
      text-align: left;
    }
  }
}
</style>
