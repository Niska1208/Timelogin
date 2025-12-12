<template>
  <q-page class="login-page flex flex-center">
    <div class="login-card q-pa-xl column items-center">
      <div class="text-h4 text-center text-primary q-mb-lg">Welcome Back!</div>
      <q-input 
        filled 
        v-model="username" 
        label="Username" 
        dense 
        outlined 
        rounded
        clearable
        class="q-mb-md"
        :rules="[val => !!val || 'Username is required']"
        prepend-icon="person"
      />
      <q-input 
        filled 
        v-model="password" 
        label="Password" 
        type="password" 
        dense 
        outlined 
        rounded
        clearable
        class="q-mb-md"
        :rules="[val => !!val || 'Password is required']"
        prepend-icon="lock"
      />
      <q-btn 
        label="Login" 
        color="primary" 
        glossy 
        unelevated
        class="full-width q-mb-md" 
        @click="loginUser"
      />
      <div class="q-mt-md">
        <router-link to="/register" class="text-primary">
          Don't have an account? Register
        </router-link>
      </div>
    </div>
  </q-page>
</template>

<script>
import api from 'src/services/api'
import { useQuasar } from 'quasar'

export default {
  name: 'LoginPage',
  setup() {
    const $q = useQuasar()
    return { $q }
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async loginUser() {
      if (!this.username || !this.password) {
        this.$q.notify({ type: 'negative', message: 'Please fill in all fields' })
        return
      }
      try {
        const response = await api.login({ username: this.username, password: this.password })
        localStorage.setItem('access_token', response.data.access)
        localStorage.setItem('refresh_token', response.data.refresh)
        this.$q.notify({ type: 'positive', message: 'Login successful' })
        this.$router.push('/')
      } catch (err) {
        console.error(err)
        this.$q.notify({ type: 'negative', message: 'Login failed' })
      }
    }
  }
}
</script>

<style scoped>

.login-card {
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  width: 100%;
  max-width: 400px;
}

.full-width {
  width: 100%;
}

.text-primary {
  color: #2575fc;
}
</style>
