<template>
  <div>
    <h2>Protected Content</h2>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      {{data}}
      <!-- Display your fetched data here -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true,
      data: null,
    };
  },
  async created() {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        // Redirect to the login page if the user is not authenticated
        // or show an error message
        return;
      }

      const response = await fetch(import.meta.env.PUBLIC_API_URL + '/v1/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        this.data = data;
      } else {
        // Handle the case where the API request is not successful
        // You can log out the user or display an error message
      }
    } catch (error) {
      // Handle any errors that occur during the API request
      console.error('API request error');
    } finally {
      this.isLoading = false;
    }
  },
};
</script>
