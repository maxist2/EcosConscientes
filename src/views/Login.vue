<template>
  <main class="login-container">
    <div class="login-form">
      <h2><i class="fas fa-user-shield"></i> Acceso Seguro</h2>
      
      <div class="user-type-selector">
        <button 
          :class="['user-type-btn', { active: userType === 'natural' }]"
          @click="userType = 'natural'"
        >
          <i class="fas fa-user"></i> Persona Natural
        </button>
        <button 
          :class="['user-type-btn', { active: userType === 'admin' }]"
          @click="userType = 'admin'"
        >
          <i class="fas fa-user-tie"></i> Administrativo
        </button>
      </div>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">
            <i class="fas fa-envelope"></i> Correo Electrónico
          </label>
          <input 
            type="email" 
            id="email" 
            v-model="loginForm.email" 
            required
            placeholder="ejemplo@correo.com"
          >
        </div>

        <div class="form-group">
          <label for="password">
            <i class="fas fa-lock"></i> Contraseña
          </label>
          <div class="password-input">
            <input 
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="loginForm.password"
              required
              placeholder="Ingresa tu contraseña"
            >
            <button 
              type="button" 
              class="toggle-password"
              @click="showPassword = !showPassword"
            >
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
        </div>

        <button type="submit" class="submit-btn">
          <i class="fas fa-sign-in-alt"></i> Iniciar Sesión
        </button>

        <div class="login-register">
          ¿No tienes cuenta? <router-link to="/registro">Regístrate aquí</router-link>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      userType: 'natural',
      showPassword: false,
      loginForm: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async handleLogin() {
      try {
        // Simular autenticación
        const user = {
          id: 1,
          nombre: 'Usuario Demo',
          email: this.loginForm.email,
          tipo: this.userType
        }

        await this.$store.dispatch('login', user)
        this.$router.push(this.userType === 'admin' ? '/admin-dashboard' : '/')
      } catch (error) {
        console.error('Error de inicio de sesión:', error)
      }
    }
  }
}
</script>