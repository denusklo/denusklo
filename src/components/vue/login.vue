<style>
  input {
    color: brown !important;
  }
</style>

<template>
  <form @submit.prevent="submitForm">
    <input type="text" v-model="username" placeholder="Username">
    <input type="password" v-model="password" placeholder="Password">
    <button type="submit">Submit</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      responseData: null,
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await fetch(import.meta.env.PUBLIC_API_URL + '/v1/test', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });

        if (response.ok) {
          // Request successful, handle the response if needed
          console.log('Form submission successful');

          // Extract the JSON data from the response body
          const data = await response.json();

          // Update the Vue component's data with the received data
          this.responseData = data;

          console.log(data);

        } else {
          // Request failed, handle the error if needed
          console.error('Form submission failed:', response.status);
        }
      } catch (error) {
        console.error('Form submission failed:', error);
        // Handle the error if needed
      }
    },
  },
};
</script>
