// src/scripts/authStore.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    // Initialize state from localStorage if tokens exist
    accessToken: localStorage.getItem('access_token') || null,
    user: null, // Will store the user object { id, email, name, etc. } after fetching
    loginError: null,
    isLoading: false, // For login and fetching user data
  }),

  getters: {
    isLoggedIn: (state) => !!state.accessToken, // !! converts to boolean
    getUser: (state) => state.user,
    getLoginError: (state) => state.loginError,
    getIsLoading: (state) => state.isLoading,
    getUserEmail: (state) => state.user ? state.user.email : null, // Assuming email is the username
    getUserName: (state) => state.user ? (state.user.name || state.user.email) : null, // Use name if available, fallback to email
  },

  actions: {
    async login(credentials) {
      this.isLoading = true;
      this.loginError = null; // Clear previous errors
      try {
        const response = await fetch(import.meta.env.PUBLIC_API_URL + '/v1/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          this.accessToken = data.access_token;
          localStorage.setItem('access_token', this.accessToken);
          this.loginError = null;

          // Immediately fetch user data after successful login
          await this.fetchUser();

          // Optional: Dispatch event if needed elsewhere, though Pinia state changes are reactive
          // window.dispatchEvent(new Event('login-success'));

        } else {
          const errorData = await response.json();
          this.loginError = errorData.message || 'Login failed. Please check your credentials.';
          this.accessToken = null;
          this.user = null;
          localStorage.removeItem('access_token');
          console.error('Login failed:', response.status, errorData);
        }
      } catch (error) {
        this.loginError = 'An unexpected error occurred during login.';
        this.accessToken = null;
        this.user = null;
        localStorage.removeItem('access_token');
        console.error('Login error:', error);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchUser() {
      this.isLoading = true; // Set loading for user fetch too
      try {
        if (!this.accessToken) {
          this.user = null; // Ensure user is null if no token
          this.isLoading = false;
          return;
        }

        const response = await fetch(import.meta.env.PUBLIC_API_URL + '/v1/user', {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          this.user = userData;
        } else {
          // If fetching user fails (e.g., token expired/invalid)
          console.error('Failed to fetch user data. Token might be invalid.', response.status);
          this.logout(); // Log out the user
        }
      } catch (error) {
        console.error('API request error fetching user:', error);
        // Decide if you want to log out on network error or just show an error message
        // For robustness, maybe don't auto-logout on *any* network error,
        // but definitely on 401/403 response from fetchUser.
        // For simplicity here, we'll just clear user data if an error occurs during the fetch.
        this.user = null;
      } finally {
        this.isLoading = false;
      }
    },

    logout() {
      this.accessToken = null;
      this.user = null;
      this.loginError = null;
      localStorage.removeItem('access_token');
      // Optional: Dispatch event
      // window.dispatchEvent(new Event('logout-success'));
      console.log('Logged out.');
    },

    // Action to check and fetch user on app initialization/page load
    async initializeAuth() {
        if (this.isLoggedIn && !this.user) {
            // If we have a token but no user data, try to fetch it
            await this.fetchUser();
        }
    }
  }
});