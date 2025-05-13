<template>
  <div class="admin-dashboard">
    <h1><i class="fas fa-columns"></i> Panel Administrativo</h1>

    <div class="dashboard-grid">
      <router-link to="/registro-pacientes" class="dashboard-card">
        <i class="fas fa-user-plus"></i>
        <h3>Registro de Pacientes</h3>
        <p>Gestionar información de pacientes</p>
      </router-link>

      <router-link to="/agenda" class="dashboard-card">
        <i class="fas fa-calendar-alt"></i>
        <h3>Agenda</h3>
        <p>Administrar citas y horarios</p>
      </router-link>

      <router-link to="/triaje" class="dashboard-card">
        <i class="fas fa-clipboard-check"></i>
        <h3>Triaje</h3>
        <p>Evaluación inicial de pacientes</p>
      </router-link>

      <div class="dashboard-card stats">
        <i class="fas fa-chart-bar"></i>
        <h3>Estadísticas</h3>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-value">{{ stats.totalPatients }}</span>
            <span class="stat-label">Pacientes</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ stats.todayAppointments }}</span>
            <span class="stat-label">Citas Hoy</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">{{ stats.pendingTriage }}</span>
            <span class="stat-label">Triajes Pendientes</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminDashboard',
  data() {
    return {
      stats: {
        totalPatients: 0,
        todayAppointments: 0,
        pendingTriage: 0
      }
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser
    }
  },
  created() {
    this.loadDashboardStats()
  },
  methods: {
    loadDashboardStats() {
      // Simular carga de estadísticas
      this.stats = {
        totalPatients: 150,
        todayAppointments: 12,
        pendingTriage: 5
      }
    }
  }
}
</script>

<style scoped>
.admin-dashboard {
  padding: 2rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.dashboard-card {
  background: #fff;
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  text-decoration: none;
  color: inherit;
}

.dashboard-card:hover {
  transform: translateY(-5px);
}

.dashboard-card i {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1rem;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
}
</style>