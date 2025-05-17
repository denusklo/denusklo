<template>
  {{ details }}
</template>

<script>

export default {
  name: 'product-display',
  props: {
    details: {
      type: Boolean,
      required: true
    }
  },
  data() {

  },
  computed: {
    details() {
      return this.details;
    }

  }
}

</script>