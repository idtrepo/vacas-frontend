<template>
  <NConfigProvider :locale="esAR" :date-locale="dateEnUS">
    <NNotificationProvider>
      <NDialogProvider>
        <VMainView />
      </NDialogProvider>
    </NNotificationProvider>
  </NConfigProvider>
</template>

<script setup>
import { NNotificationProvider, NConfigProvider, NDialogProvider, esAR, dateEnUS } from 'naive-ui'
import { defineAsyncComponent } from 'vue';

// componentes
const VMainView = defineAsyncComponent(() => import('@/views/VMainView.vue'));
</script>
