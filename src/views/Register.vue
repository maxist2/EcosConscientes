<template>
  <main class="register-container">
    <div class="register-form">
      <h2><i class="fas fa-user-plus"></i> Registro de Usuario</h2>

      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="nombre">
            <i class="fas fa-user"></i> Nombre Completo
          </label>
          <input 
            type="text" 
            id="nombre" 
            v-model="registerForm.nombre" 
            required
            placeholder="Ingresa tu nombre completo"
          >
        </div>

        <div class="form-group">
          <label for="email">
            <i class="fas fa-envelope"></i> Correo Electrónico
          </label>
          <input 
            type="email" 
            id="email" 
            v-model="registerForm.email" 
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
              v-model="registerForm.password"
              required
              placeholder="Crea una contraseña segura"
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

        <div class="form-group">
          <label for="confirmPassword">
            <i class="fas fa-lock"></i> Confirmar Contraseña
          </label>
          <div class="password-input">
            <input 
              :type="showConfirmPassword ? 'text' : 'password'"
              id="confirmPassword"
              v-model="registerForm.confirmPassword"
              required
              placeholder="Confirma tu contraseña"
            >
            <button 
              type="button" 
              class="toggle-password"
              @click="showConfirmPassword = !showConfirmPassword"
            >
              <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
        </div>

        <div class="form-group">
          <label for="telefono">
            <i class="fas fa-phone"></i> Teléfono
          </label>
          <input 
            type="tel" 
            id="telefono" 
            v-model="registerForm.telefono" 
            required
            placeholder="Ingresa tu número de teléfono"
          >
        </div>

        <button type="submit" class="submit-btn">
          <i class="fas fa-user-plus"></i> Registrarse
        </button>

        <div class="login-register">
          ¿Ya tienes cuenta? <router-link to="/login">Inicia sesión aquí</router-link>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      showPassword: false,
      showConfirmPassword: false,
      registerForm: {
        nombre: '',
        email: '',
        password: '',
        confirmPassword: '',
        telefono: ''
      }
    }
  },
  methods: {
    async handleRegister() {
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        alert('Las contraseñas no coinciden')
        return
      }

      try {
        // Simular registro
        const user = {
          id: Date.now(),
          nombre: this.registerForm.nombre,
          email: this.registerForm.email,
          telefono: this.registerForm.telefono,
          tipo: 'natural'
        }

        await this.$store.dispatch('login', user)
        this.$router.push('/')
      } catch (error) {
        console.error('Error de registro:', error)
      }
    }
  }
}
</script>