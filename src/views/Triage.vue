<template>
  <div class="triage-container">
    <div class="triage-form fade-in">
      <h2><i class="fas fa-clipboard-check"></i> Cuestionario de Triage Psicológico</h2>
      <p class="triage-description">Este cuestionario nos ayudará a determinar el nivel de atención que necesitas. Por favor, responde con honestidad.</p>
      
      <form @submit.prevent="submitTriage" id="triageForm">
        <!-- Triage I - Emergencia -->
        <div class="triage-section">
          <h3><i class="fas fa-exclamation-circle"></i> Triage I – Emergencia – Atención Inmediata</h3>
          <div class="question-group">
            <label>
              <input type="checkbox" v-model="triageForm.emergencia.suicidio">
              Pensamientos o planes suicidas activos
            </label>
            <label>
              <input type="checkbox" v-model="triageForm.emergencia.violencia">
              Víctima de violencia reciente
            </label>
            <label>
              <input type="checkbox" v-model="triageForm.emergencia.psicosis">
              Síntomas psicóticos agudos
            </label>
          </div>
        </div>

        <!-- Triage II - Urgente -->
        <div class="triage-section">
          <h3><i class="fas fa-exclamation"></i> Triage II – Urgente – Atención Prioritaria</h3>
          <div class="question-group">
            <label>
              <input type="checkbox" v-model="triageForm.urgente.depresion">
              Depresión severa
            </label>
            <label>
              <input type="checkbox" v-model="triageForm.urgente.ansiedad">
              Ataques de pánico frecuentes
            </label>
            <label>
              <input type="checkbox" v-model="triageForm.urgente.trauma">
              Trauma reciente
            </label>
          </div>
        </div>

        <!-- Triage III - No Urgente -->
        <div class="triage-section">
          <h3><i class="fas fa-info-circle"></i> Triage III – No Urgente – Atención Regular</h3>
          <div class="question-group">
            <label>
              <input type="checkbox" v-model="triageForm.noUrgente.estres">
              Estrés general
            </label>
            <label>
              <input type="checkbox" v-model="triageForm.noUrgente.relaciones">
              Problemas de relaciones
            </label>
            <label>
              <input type="checkbox" v-model="triageForm.noUrgente.autoestima">
              Baja autoestima
            </label>
          </div>
        </div>

        <!-- Información Adicional -->
        <div class="triage-section">
          <h3><i class="fas fa-notes-medical"></i> Información Adicional</h3>
          <div class="form-group">
            <label for="sintomas">Describe tus síntomas principales:</label>
            <textarea 
              id="sintomas" 
              v-model="triageForm.informacionAdicional.sintomas" 
              rows="4"
              required
            ></textarea>
          </div>
          <div class="form-group">
            <label for="duracion">¿Hace cuánto tiempo experimentas estos síntomas?</label>
            <input 
              type="text" 
              id="duracion" 
              v-model="triageForm.informacionAdicional.duracion" 
              required
            >
          </div>
          <div class="form-group">
            <label for="tratamiento">¿Has recibido tratamiento psicológico anteriormente?</label>
            <select 
              id="tratamiento" 
              v-model="triageForm.informacionAdicional.tratamientoPrevio" 
              required
            >
              <option value="">Selecciona una opción</option>
              <option value="si">Sí</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        <button type="submit" class="submit-btn">
          <i class="fas fa-paper-plane"></i> Enviar Evaluación
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Triage',
  data() {
    return {
      triageForm: {
        emergencia: {
          suicidio: false,
          violencia: false,
          psicosis: false
        },
        urgente: {
          depresion: false,
          ansiedad: false,
          trauma: false
        },
        noUrgente: {
          estres: false,
          relaciones: false,
          autoestima: false
        },
        informacionAdicional: {
          sintomas: '',
          duracion: '',
          tratamientoPrevio: ''
        }
      }
    }
  },
  methods: {
    determinarNivelUrgencia() {
      if (Object.values(this.triageForm.emergencia).some(val => val)) {
        return 'EMERGENCIA'
      } else if (Object.values(this.triageForm.urgente).some(val => val)) {
        return 'URGENTE'
      } else {
        return 'NO URGENTE'
      }
    },
    async submitTriage() {
      try {
        const nivelUrgencia = this.determinarNivelUrgencia()
        const triageData = {
          ...this.triageForm,
          nivelUrgencia,
          fecha: new Date().toISOString(),
          pacienteId: this.$store.getters.currentUser?.id
        }

        console.log('Triage enviado:', triageData)
        // Aquí se implementaría la lógica para guardar el triage

        // Resetear formulario
        this.triageForm = {
          emergencia: { suicidio: false, violencia: false, psicosis: false },
          urgente: { depresion: false, ansiedad: false, trauma: false },
          noUrgente: { estres: false, relaciones: false, autoestima: false },
          informacionAdicional: { sintomas: '', duracion: '', tratamientoPrevio: '' }
        }

        this.$router.push('/admin-dashboard')
      } catch (error) {
        console.error('Error al enviar el triage:', error)
      }
    }
  }
}
</script>