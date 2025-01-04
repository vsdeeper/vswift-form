<script setup lang="ts">
import { VsFormDesigner, type FormDesignData } from '@/components'
import { initFormDesignData } from '@/stores'

const model = ref<FormDesignData>(initFormDesignData())
</script>

<template>
  <VsFormDesigner height="calc(100vh - 20px)" v-model="model" />
</template>
