<template>
  <q-page class="register-page flex flex-center">
    <div class="register-card q-pa-xl column items-center">
      <div class="text-h4 text-center text-primary q-mb-lg">Create Your Account</div>
      
      <q-input 
        filled 
        v-model="username" 
        label="Username" 
        dense 
        outlined 
        rounded
        clearable
        class="q-mb-md"
        prepend-icon="person"
        :rules="[val => !!val || 'Username is required']"
      />

      <q-input 
        filled 
        v-model="email" 
        label="Email" 
        type="email" 
        dense 
        outlined 
        rounded
        clearable
        class="q-mb-md"
        prepend-icon="email"
        :rules="[val => !!val || 'Email is required']"
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
        prepend-icon="lock"
        :rules="[val => !!val || 'Password is required']"
      />

      <q-input 
        filled 
        v-model="password2" 
        label="Confirm Password" 
        type="password" 
        dense 
        outlined 
        rounded
        clearable
        class="q-mb-md"
        prepend-icon="lock"
        :rules="[val => !!val || 'Confirm your password']"
      />

      <q-btn 
        label="Register" 
        color="primary" 
        glossy 
        unelevated
        class="full-width q-mb-md" 
        @click="registerUser"
      />

      <div class="q-mt-md">
        <router-link to="/login" class="text-primary">
          Already have an account? Login
        </router-link>
      </div>
    </div>
  </q-page>
</template>

<script>
import api from "src/services/api";
import { useQuasar } from 'quasar';

export default {
  name: "RegisterPage",
  setup() {
    const $q = useQuasar();
    return { $q };
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      password2: ''
    };
  },
  methods: {
    async registerUser() {
      if (!this.username || !this.email || !this.password || !this.password2) {
        this.$q.notify({ type: 'negative', message: 'Please fill in all fields' });
        return;
      }
      if (this.password !== this.password2) {
        this.$q.notify({ type: 'negative', message: 'Passwords do not match' });
        return;
      }

      try {
        await api.register({
          username: this.username,
          email: this.email,
          password: this.password
        });
        this.$q.notify({ type: 'positive', message: 'Registration successful! Please login.' });
        this.$router.push({ name: 'LoginPage' });
      } catch (err) {
        console.error(err);
        let msg = 'Registration failed';
        if (err.response?.data) {
          msg = Object.values(err.response.data).flat().join(' ');
        }
        this.$q.notify({ type: 'negative', message: msg });
      }
    }
  }
}
</script>

<style scoped>


.register-card {
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
  color: #ff7e5f;
}
</style>
