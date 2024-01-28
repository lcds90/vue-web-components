<script setup lang="ts">
import { ref } from 'vue'
import { logEvent } from 'histoire/client'

const text = ref('Botão')
</script>

<template>
  <Story title="Botão" :layout="{ type: 'grid', width: 200 }">
    <Variant title="default">
      <wc-base-button @click="logEvent('click', $event)">
      {{ text }}
    </wc-base-button>
    </Variant>

    <Variant title="green">
      <wc-base-button color="green" @click="logEvent('click', $event)">
      {{ text }}
    </wc-base-button>
    </Variant>

    <Variant title="red">
      <wc-base-button color="red" @click="logEvent('click', $event)">
      {{ text }}
    </wc-base-button>
    </Variant>

    <template #controls>
      <HstText title="Texto para o botão" v-model="text" />
    </template>
  </Story>
</template>
