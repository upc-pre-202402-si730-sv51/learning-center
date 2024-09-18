<script>
import LanguageSwitcher from "./public/components/language-switcher.component.vue";

export default {
  name: 'app',
  components: {LanguageSwitcher},
  title: 'ACME Learning Center',
  data() {
    return {
      drawer: false,
      items: [
        { label: 'Home', to: '/home'},
        { label: 'About', to: '/about'},
        { label: 'Categories', to: '/publishing/categories'}
      ]
    }
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    }
  }
}

</script>

<template>
  <pv-toast/>
  <header>
    <pv-toolbar class="bg-primary">
      <template #start>
        <pv-button class="p-button-text" icon="pi pi-bars" @click="toggleDrawer"/>
        <h2>ACME Learning Center</h2>
      </template>
      <template #center>
        <div class="flex-column">
          <router-link v-for="item in items" :key="item.label" v-slot="{navigate, href}" :to="item.to" custom>
            <pv-button :href="href" class="p-button-text" @click="navigate">{{ item.label }}</pv-button>
          </router-link>
        </div>
      </template>
      <template #end>
        <language-switcher/>
      </template>
    </pv-toolbar>
    <pv-drawer v-model:visible="drawer"/>
  </header>
  <main>
    <router-view/>
  </main>
</template>

<style scoped>

</style>
