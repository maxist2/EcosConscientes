<template>
  <div class="home">
    <section id="inicio" class="hero-section">
      <div class="hero-content">
        <h1>Bienvenido a Ecos Conscientes</h1>
        <p>Tu espacio seguro para el bienestar emocional</p>
        <router-link to="/registro" class="cta-button">
          <i class="fas fa-user-plus"></i> Únete a nosotros
        </router-link>
      </div>
    </section>

    <section id="nosotros" class="about-section">
      <h2>Sobre Nosotros</h2>
      <div class="about-content">
        <p>Somos un equipo comprometido con tu salud mental y bienestar emocional.</p>
        <div class="team-members">
          <div class="team-member">
            <img src="/assets/images/Gabriela.jpg" alt="Gabriela">
            <h3>Gabriela</h3>
            <p>Psicóloga Clínica</p>
          </div>
          <div class="team-member">
            <img src="/assets/images/Jonathan.jpg" alt="Jonathan">
            <h3>Jonathan</h3>
            <p>Terapeuta</p>
          </div>
          <div class="team-member">
            <img src="/assets/images/María.jpg" alt="María">
            <h3>María</h3>
            <p>Consejera</p>
          </div>
        </div>
      </div>
    </section>

    <section id="servicios" class="services-section">
      <h2>Nuestros Servicios</h2>
      <div class="services-grid">
        <div class="service-card">
          <i class="fas fa-comments"></i>
          <h3>Terapia Individual</h3>
          <p>Sesiones personalizadas para tu crecimiento personal</p>
        </div>
        <div class="service-card">
          <i class="fas fa-users"></i>
          <h3>Terapia Grupal</h3>
          <p>Comparte y aprende en un ambiente seguro</p>
        </div>
        <div class="service-card">
          <i class="fas fa-heart"></i>
          <h3>Consejería</h3>
          <p>Orientación para tus decisiones importantes</p>
        </div>
      </div>
    </section>

    <section id="paquetes" class="packages-section">
      <h2>Paquetes de Servicios</h2>
      <div class="packages-grid">
        <div class="package-card">
          <h3>Básico</h3>
          <p class="price">S/. 150</p>
          <ul>
            <li>4 sesiones mensuales</li>
            <li>Evaluación inicial</li>
            <li>Seguimiento básico</li>
          </ul>
          <router-link to="/registro" class="package-button">Elegir Plan</router-link>
        </div>
        <div class="package-card featured">
          <h3>Premium</h3>
          <p class="price">S/. 250</p>
          <ul>
            <li>8 sesiones mensuales</li>
            <li>Evaluación completa</li>
            <li>Seguimiento personalizado</li>
            <li>Recursos adicionales</li>
          </ul>
          <router-link to="/registro" class="package-button">Elegir Plan</router-link>
        </div>
        <div class="package-card">
          <h3>Empresarial</h3>
          <p class="price">Consultar</p>
          <ul>
            <li>Sesiones ilimitadas</li>
            <li>Evaluación grupal</li>
            <li>Talleres mensuales</li>
            <li>Soporte 24/7</li>
          </ul>
          <router-link to="/registro" class="package-button">Contactar</router-link>
        </div>
      </div>
    </section>

    <section id="contacto" class="contact-section">
      <h2>Contáctanos</h2>
      <div class="contact-container">
        <div class="contact-info">
          <div class="contacto-item">
            <i class="fas fa-map-marker-alt"></i>
            <p>Dirección: Av. Universidad 123</p>
          </div>
          <div class="contacto-item">
            <i class="fas fa-phone"></i>
            <p>Teléfono: (01) 234-5678</p>
          </div>
          <div class="contacto-item">
            <i class="fas fa-envelope"></i>
            <p>Email: contacto@ecosconscientes.com</p>
          </div>
          <div class="contacto-redes">
            <a href="#" class="red-social"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="red-social"><i class="fab fa-instagram"></i></a>
            <a href="#" class="red-social"><i class="fab fa-twitter"></i></a>
          </div>
        </div>
        <form @submit.prevent="enviarContacto" class="contact-form">
          <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" v-model="contactForm.nombre" required>
          </div>
          <div class="form-group">
            <label for="email">Correo electrónico:</label>
            <input type="email" id="email" v-model="contactForm.email" required>
          </div>
          <div class="form-group">
            <label for="mensaje">Mensaje:</label>
            <textarea id="mensaje" v-model="contactForm.mensaje" required></textarea>
          </div>
          <button type="submit" class="submit-button">
            <i class="fas fa-paper-plane"></i> Enviar Mensaje
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      contactForm: {
        nombre: '',
        email: '',
        mensaje: ''
      }
    }
  },
  methods: {
    enviarContacto() {
      // Implementar lógica de envío de contacto
      console.log('Formulario enviado:', this.contactForm)
      // Resetear formulario
      this.contactForm = {
        nombre: '',
        email: '',
        mensaje: ''
      }
    }
  }
}
</script>