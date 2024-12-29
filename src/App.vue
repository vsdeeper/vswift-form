<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<template>
  <el-config-provider :locale="zhCn" namespace="vs">
    <VsFormDesignerTest />
  </el-config-provider>
</template>

<style lang="scss" scoped>
.my-tabs {
  display: flex;
  & > :deep(div[class*='-tabs__content']) {
    flex: 1;
    padding: 20px;
  }
}
</style>
