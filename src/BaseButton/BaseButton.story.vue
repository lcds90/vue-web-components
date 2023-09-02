<script setup>
import { ref } from 'vue'
import { logEvent } from 'histoire/client'
import BaseButton from './BaseButton.ce.vue'

const text = ref('Botão')
</script>

<template>
  <Story title="Botão" :layout="{ type: 'grid', width: 200 }">
    <Variant title="default">
      <BaseButton @click="logEvent('click', $event)">
      {{ text }}
    </BaseButton>
    </Variant>

    <Variant title="green">
      <BaseButton color="green" @click="logEvent('click', $event)">
      {{ text }}
    </BaseButton>
    </Variant>

    <Variant title="red">
      <BaseButton color="red" @click="logEvent('click', $event)">
      {{ text }}
    </BaseButton>
    </Variant>

    <template #controls>
      <HstText title="Texto para o botão" v-model="text" />
    </template>
  </Story>
</template>
