<template>
  <div class="agenda-container">
    <h2><i class="fas fa-calendar-alt"></i> Agenda de Citas</h2>

    <!-- Formulario de Nueva Cita -->
    <div class="appointment-form" v-if="showForm">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="paciente">
            <i class="fas fa-user"></i> Paciente
          </label>
          <select 
            id="paciente" 
            v-model="appointmentForm.pacienteId" 
            required
          >
            <option value="">Seleccione un paciente</option>
            <option v-for="patient in patients" :key="patient.id" :value="patient.id">
              {{ patient.nombre }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="fecha">
            <i class="fas fa-calendar"></i> Fecha
          </label>
          <input 
            type="date" 
            id="fecha" 
            v-model="appointmentForm.fecha" 
            required
            :min="minDate"
          >
        </div>

        <div class="form-group">
          <label for="hora">
            <i class="fas fa-clock"></i> Hora
          </label>
          <select id="hora" v-model="appointmentForm.hora" required>
            <option value="">Seleccione una hora</option>
            <option v-for="hora in horasDisponibles" :key="hora" :value="hora">
              {{ hora }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="tipo">
            <i class="fas fa-tag"></i> Tipo de Consulta
          </label>
          <select id="tipo" v-model="appointmentForm.tipo" required>
            <option value="">Seleccione el tipo</option>
            <option value="primera">Primera Consulta</option>
            <option value="seguimiento">Seguimiento</option>
            <option value="urgente">Urgente</option>
          </select>
        </div>

        <div class="form-group">
          <label for="notas">
            <i class="fas fa-sticky-note"></i> Notas
          </label>
          <textarea 
            id="notas" 
            v-model="appointmentForm.notas" 
            rows="3"
          ></textarea>
        </div>

        <div class="form-actions">
          <button type="submit" class="submit-btn">
            <i class="fas fa-save"></i> {{ editingId ? 'Actualizar' : 'Agendar' }} Cita
          </button>
          <button type="button" class="cancel-btn" @click="cancelForm">
            <i class="fas fa-times"></i> Cancelar
          </button>
        </div>
      </form>
    </div>

    <!-- Vista de Calendario -->
    <div class="calendar-view" v-else>
      <div class="calendar-header">
        <button class="add-btn" @click="showForm = true">
          <i class="fas fa-plus"></i> Nueva Cita
        </button>
        <div class="calendar-navigation">
          <button @click="previousWeek">
            <i class="fas fa-chevron-left"></i>
          </button>
          <span>{{ currentWeekDisplay }}</span>
          <button @click="nextWeek">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <div class="calendar-grid">
        <div class="calendar-days">
          <div class="time-column">
            <div class="time-slot" v-for="hora in horas" :key="hora">
              {{ hora }}
            </div>
          </div>
          <div 
            v-for="day in weekDays" 
            :key="day.date" 
            class="day-column"
          >
            <div class="day-header">
              {{ day.name }}<br>
              {{ day.date }}
            </div>
            <div 
              v-for="hora in horas" 
              :key="hora"
              class="time-slot"
              :class="{ 'has-appointment': hasAppointment(day.date, hora) }"
              @click="selectTimeSlot(day.date, hora)"
            >
              <div 
                v-if="getAppointment(day.date, hora)" 
                class="appointment-card"
                :class="getAppointmentClass(getAppointment(day.date, hora))"
              >
                {{ getAppointmentPatient(getAppointment(day.date, hora)) }}
                <div class="appointment-actions">
                  <button @click.stop="editAppointment(getAppointment(day.date, hora))">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button @click.stop="deleteAppointment(getAppointment(day.date, hora).id)">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Agenda',
  data() {
    return {
      showForm: false,
      editingId: null,
      currentWeek: new Date(),
      appointmentForm: {
        pacienteId: '',
        fecha: '',
        hora: '',
        tipo: '',
        notas: ''
      },
      horas: [
        '09:00', '10:00', '11:00', '12:00',
        '14:00', '15:00', '16:00', '17:00'
      ],
      appointments: [],
      patients: []
    }
  },
  computed: {
    minDate() {
      const today = new Date()
      return today.toISOString().split('T')[0]
    },
    horasDisponibles() {
      return this.horas.filter(hora => 
        !this.appointments.some(app => 
          app.fecha === this.appointmentForm.fecha && 
          app.hora === hora
        )
      )
    },
    weekDays() {
      const days = []
      const start = new Date(this.currentWeek)
      start.setDate(start.getDate() - start.getDay()) // Comenzar desde el domingo

      for (let i = 0; i < 7; i++) {
        const date = new Date(start)
        date.setDate(date.getDate() + i)
        days.push({
          name: new Intl.DateTimeFormat('es', { weekday: 'short' }).format(date),
          date: date.toISOString().split('T')[0]
        })
      }
      return days
    },
    currentWeekDisplay() {
      const start = this.weekDays[0].date
      const end = this.weekDays[6].date
      return `${start} - ${end}`
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      // Simular carga de datos
      this.patients = [
        { id: 1, nombre: 'Juan Pérez' },
        { id: 2, nombre: 'María García' }
      ]
      this.appointments = [
        {
          id: 1,
          pacienteId: 1,
          fecha: '2024-01-15',
          hora: '09:00',
          tipo: 'primera',
          notas: 'Primera consulta'
        }
      ]
    },
    previousWeek() {
      const newDate = new Date(this.currentWeek)
      newDate.setDate(newDate.getDate() - 7)
      this.currentWeek = newDate
    },
    nextWeek() {
      const newDate = new Date(this.currentWeek)
      newDate.setDate(newDate.getDate() + 7)
      this.currentWeek = newDate
    },
    hasAppointment(date, hora) {
      return this.appointments.some(app => app.fecha === date && app.hora === hora)
    },
    getAppointment(date, hora) {
      return this.appointments.find(app => app.fecha === date && app.hora === hora)
    },
    getAppointmentPatient(appointment) {
      const patient = this.patients.find(p => p.id === appointment.pacienteId)
      return patient ? patient.nombre : 'Paciente no encontrado'
    },
    getAppointmentClass(appointment) {
      return {
        'primera': appointment.tipo === 'primera',
        'seguimiento': appointment.tipo === 'seguimiento',
        'urgente': appointment.tipo === 'urgente'
      }
    },
    selectTimeSlot(date, hora) {
      if (!this.hasAppointment(date, hora)) {
        this.appointmentForm.fecha = date
        this.appointmentForm.hora = hora
        this.showForm = true
      }
    },
    async handleSubmit() {
      try {
        const appointmentData = {
          ...this.appointmentForm,
          id: this.editingId || Date.now()
        }

        if (this.editingId) {
          // Actualizar cita existente
          const index = this.appointments.findIndex(a => a.id === this.editingId)
          this.appointments[index] = appointmentData
        } else {
          // Agregar nueva cita
          this.appointments.push(appointmentData)
        }

        this.resetForm()
      } catch (error) {
        console.error('Error al guardar cita:', error)
      }
    },
    editAppointment(appointment) {
      this.editingId = appointment.id
      this.appointmentForm = { ...appointment }
      this.showForm = true
    },
    deleteAppointment(id) {
      if (confirm('¿Está seguro de eliminar esta cita?')) {
        this.appointments = this.appointments.filter(a => a.id !== id)
      }
    },
    cancelForm() {
      this.resetForm()
    },
    resetForm() {
      this.appointmentForm = {
        pacienteId: '',
        fecha: '',
        hora: '',
        tipo: '',
        notas: ''
      }
      this.editingId = null
      this.showForm = false
    }
  }
}
</script>

<style scoped>
.agenda-container {
  padding: 2rem;
}

.appointment-form {
  max-width: 800px;
  margin: 2rem auto;
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.calendar-navigation {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.calendar-grid {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: auto;
}

.calendar-days {
  display: flex;
  min-width: 800px;
}

.time-column {
  width: 80px;
  border-right: 1px solid #ddd;
}

.day-column {
  flex: 1;
  min-width: 120px;
  border-right: 1px solid #ddd;
}

.day-column:last-child {
  border-right: none;
}

.day-header {
  padding: 1rem;
  text-align: center;
  background: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.time-slot {
  height: 60px;
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  position: relative;
}

.time-slot:hover {
  background: #f9f9f9;
}

.appointment-card {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.5rem;
  background: #e3f2fd;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.appointment-card.primera { background: #e3f2fd; }
.appointment-card.seguimiento { background: #e8f5e9; }
.appointment-card.urgente { background: #ffebee; }

.appointment-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.appointment-actions button {
  padding: 0.25rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.5);
}

.appointment-actions button:hover {
  background: rgba(255, 255, 255, 0.8);
}
</style>