<script>
export default {
  name: "language-switcher",
  data() {
    return {
      languages: ['en', 'es'],
      language: 'en'
    }
  }
}
</script>

<template>
  <pv-select-button v-model="$i18n.locale" :options="languages">
    <template #option="slotProps">
      {{ slotProps.option.toUpperCase() }}
    </template>
  </pv-select-button>
</template>

<style scoped>

</style>