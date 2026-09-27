<template>
  <div>
    <nav>
      <button role="button" @click="openMenu(true)" v-if="!isMenuOpen">
        Open Menu
      </button>
      <button role="button" @click="openMenu(false)" v-else>
        Close Menu
      </button>
      <ul v-if="isMenuOpen">
        <li>
          <a href="/v1">Home</a>
        </li>
        <li>
          <a href="/v1/about">About</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isMenuOpen = ref<boolean>(false)

const openMenu = (action: boolean) => {
  isMenuOpen.value = action;
}
</script>