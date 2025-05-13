<template>
  <div class="app">
    <header>
      <nav>
        <div class="logo">
          <img src="/assets/images/LOGO.svg" alt="Logo Ecos Conscientes" id="logo">
          <span class="logo-text">Ecos Conscientes</span>
        </div>
        <ul class="menu" v-if="$route.path === '/'">
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#nosotros">Nosotros</a></li>
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#paquetes">Paquetes</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <div class="header-actions" v-if="$route.path === '/'">
          <div v-if="isAuthenticated" class="usuario-info">
            <span>{{ currentUser?.nombre }}</span>
            <button @click="logout" class="logout-btn">Cerrar Sesión</button>
          </div>
          <router-link v-else to="/login" class="login-btn">
            <i class="fas fa-user"></i> Iniciar Sesión
          </router-link>
        </div>
        <router-link v-else :to="backLink" class="back-btn">
          <i class="fas fa-arrow-left"></i> Volver
        </router-link>
      </nav>
    </header>

    <main>
      <router-view></router-view>
    </main>

    <footer v-if="showFooter">
      <div class="footer-content">
        <div class="footer-logo">
          <h3>E c o s - C o n s c i e n t e s</h3>
          <p class="slogan-footer">Tus pensamientos hacen eco, tu bienestar es nuestra prioridad</p>
        </div>
        <div class="footer-info">
          <p>&copy; 2025 Escuchadero Ecos Conscientes. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters(['isAuthenticated', 'currentUser']),
    showFooter() {
      return ['/', '/login', '/registro'].includes(this.$route.path)
    },
    backLink() {
      const authRoutes = ['/admin-dashboard', '/triaje', '/registro-pacientes', '/agenda']
      return authRoutes.includes(this.$route.path) ? '/admin-dashboard' : '/'
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      if (this.$route.meta.requiresAuth) {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style>
@import '@fortawesome/fontawesome-free/css/all.min.css';
@import '/assets/css/styles.css';
</style>
