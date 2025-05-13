<template>
  <div class="patient-registry">
    <h2><i class="fas fa-user-plus"></i> Registro de Pacientes</h2>

    <!-- Formulario de Registro -->
    <div class="registry-form" v-if="showForm">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="nombre">
            <i class="fas fa-user"></i> Nombre Completo
          </label>
          <input 
            type="text" 
            id="nombre" 
            v-model="patientForm.nombre" 
            required
          >
        </div>

        <div class="form-group">
          <label for="edad">
            <i class="fas fa-birthday-cake"></i> Edad
          </label>
          <input 
            type="number" 
            id="edad" 
            v-model="patientForm.edad" 
            required
            min="0"
            max="120"
          >
        </div>

        <div class="form-group">
          <label for="genero">
            <i class="fas fa-venus-mars"></i> Género
          </label>
          <select id="genero" v-model="patientForm.genero" required>
            <option value="">Seleccione un género</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div class="form-group">
          <label for="telefono">
            <i class="fas fa-phone"></i> Teléfono
          </label>
          <input 
            type="tel" 
            id="telefono" 
            v-model="patientForm.telefono" 
            required
          >
        </div>

        <div class="form-group">
          <label for="email">
            <i class="fas fa-envelope"></i> Correo Electrónico
          </label>
          <input 
            type="email" 
            id="email" 
            v-model="patientForm.email" 
            required
          >
        </div>

        <div class="form-group">
          <label for="direccion">
            <i class="fas fa-map-marker-alt"></i> Dirección
          </label>
          <input 
            type="text" 
            id="direccion" 
            v-model="patientForm.direccion" 
            required
          >
        </div>

        <div class="form-group">
          <label for="motivo">
            <i class="fas fa-comment-medical"></i> Motivo de Consulta
          </label>
          <textarea 
            id="motivo" 
            v-model="patientForm.motivo" 
            required
            rows="4"
          ></textarea>
        </div>

        <div class="form-actions">
          <button type="submit" class="submit-btn">
            <i class="fas fa-save"></i> {{ editingId ? 'Actualizar' : 'Registrar' }} Paciente
          </button>
          <button type="button" class="cancel-btn" @click="cancelForm">
            <i class="fas fa-times"></i> Cancelar
          </button>
        </div>
      </form>
    </div>

    <!-- Lista de Pacientes -->
    <div class="patients-list" v-else>
      <div class="list-header">
        <button class="add-btn" @click="showForm = true">
          <i class="fas fa-plus"></i> Nuevo Paciente
        </button>
        <div class="search-bar">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Buscar pacientes..."
          >
          <i class="fas fa-search"></i>
        </div>
      </div>

      <table class="patients-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Género</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="patient in filteredPatients" :key="patient.id">
            <td>{{ patient.nombre }}</td>
            <td>{{ patient.edad }}</td>
            <td>{{ patient.genero }}</td>
            <td>{{ patient.telefono }}</td>
            <td>{{ patient.email }}</td>
            <td class="actions">
              <button class="edit-btn" @click="editPatient(patient)">
                <i class="fas fa-edit"></i>
              </button>
              <button class="delete-btn" @click="deletePatient(patient.id)">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PatientRegistry',
  data() {
    return {
      showForm: false,
      editingId: null,
      searchQuery: '',
      patientForm: {
        nombre: '',
        edad: '',
        genero: '',
        telefono: '',
        email: '',
        direccion: '',
        motivo: ''
      },
      patients: []
    }
  },
  computed: {
    filteredPatients() {
      return this.patients.filter(patient => 
        patient.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        patient.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    }
  },
  created() {
    this.loadPatients()
  },
  methods: {
    loadPatients() {
      // Simular carga de pacientes
      this.patients = [
        {
          id: 1,
          nombre: 'Juan Pérez',
          edad: 30,
          genero: 'masculino',
          telefono: '123-456-789',
          email: 'juan@email.com',
          direccion: 'Av. Principal 123',
          motivo: 'Consulta general'
        }
      ]
    },
    async handleSubmit() {
      try {
        const patientData = {
          ...this.patientForm,
          id: this.editingId || Date.now()
        }

        if (this.editingId) {
          // Actualizar paciente existente
          const index = this.patients.findIndex(p => p.id === this.editingId)
          this.patients[index] = patientData
        } else {
          // Agregar nuevo paciente
          this.patients.push(patientData)
        }

        this.resetForm()
      } catch (error) {
        console.error('Error al guardar paciente:', error)
      }
    },
    editPatient(patient) {
      this.editingId = patient.id
      this.patientForm = { ...patient }
      this.showForm = true
    },
    deletePatient(id) {
      if (confirm('¿Está seguro de eliminar este paciente?')) {
        this.patients = this.patients.filter(p => p.id !== id)
      }
    },
    cancelForm() {
      this.resetForm()
    },
    resetForm() {
      this.patientForm = {
        nombre: '',
        edad: '',
        genero: '',
        telefono: '',
        email: '',
        direccion: '',
        motivo: ''
      }
      this.editingId = null
      this.showForm = false
    }
  }
}
</script>

<style scoped>
.patient-registry {
  padding: 2rem;
}

.registry-form {
  max-width: 800px;
  margin: 2rem auto;
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.search-bar {
  position: relative;
  width: 300px;
}

.search-bar input {
  width: 100%;
  padding: 0.5rem 2rem 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 20px;
}

.search-bar i {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.patients-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.patients-table th,
.patients-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.patients-table th {
  background: #f5f5f5;
  font-weight: 600;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.edit-btn,
.delete-btn {
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-btn {
  background: #4CAF50;
  color: white;
}

.delete-btn {
  background: #f44336;
  color: white;
}
</style>