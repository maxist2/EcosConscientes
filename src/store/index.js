import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    patients: [],
    appointments: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
      } else {
        localStorage.removeItem('user')
      }
    },
    setPatients(state, patients) {
      state.patients = patients
    },
    addPatient(state, patient) {
      state.patients.push(patient)
    },
    setAppointments(state, appointments) {
      state.appointments = appointments
    },
    addAppointment(state, appointment) {
      state.appointments.push(appointment)
    }
  },
  actions: {
    login({ commit }, user) {
      commit('setUser', user)
    },
    logout({ commit }) {
      commit('setUser', null)
    },
    registerPatient({ commit }, patient) {
      commit('addPatient', patient)
    },
    scheduleAppointment({ commit }, appointment) {
      commit('addAppointment', appointment)
    }
  },
  getters: {
    isAuthenticated: state => !!state.user,
    currentUser: state => state.user,
    getPatients: state => state.patients,
    getAppointments: state => state.appointments
  }
})