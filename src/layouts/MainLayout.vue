<template>
  <q-layout>
    <q-page-container class="q-h-full">
      <q-flex justify="center" align="center" class="q-h-full">
        <router-view />
      </q-flex>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  setup () {
    return {}
  }
})
</script>
