<template>
  <q-page class="q-pa-md">
    <div class="text-center text-h3 text-weight-bolder q-mb-md">
      Time Logs
    </div>

    <div class="q-mb-md row q-gutter-sm">
      <q-btn style="background: purple; color: white" label="Day Logs" @click="showLogs" />
      <q-btn style="background: #FF0080; color: white" label="All Entries" @click="showEntries" />
    </div>

    <!-- Day Logs Table -->
    <div v-if="showLogsTable" class="table-container">
      <q-table
        flat
        bordered
        class="dark-borders small-table"
        title="Day Logs"
        :rows="logs"
        :columns="dayColumns"
        row-key="id"
      >
        <template v-slot:body="props">
          <q-tr :props="props" @click="viewDay(props.row.id)" class="cursor-pointer">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ props.row[col.field] || '-' }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>

    <!-- Time Entries Table -->
    <div v-if="showEntriesTable" class="table-container">
      <q-table
        flat
        bordered
        class="dark-borders small-table"
        title="All Time Entries"
        :rows="entries"
        :columns="entryColumns"
        row-key="id"
      />
    </div>

    <!-- Floating Logout Button -->
    <q-btn
      round
      icon="logout"
      color="red"
      class="logout-btn"
      @click="logout"
      glossy
      unelevated
    />
  </q-page>
</template>

<script>
import api from 'src/services/api'
import { useQuasar } from 'quasar'

export default {
  name: 'IndexPage',
  setup() {
    const $q = useQuasar()
    return { $q }
  },
  data() {
    return {
      logs: [],
      entries: [],
      showLogsTable: false,
      showEntriesTable: false,
      dayColumns: [
        { name: 'date', label: 'Date', field: 'date', align: 'left' },
        { name: 'goal', label: 'Goal', field: 'goal', align: 'left' }
      ],
      entryColumns: [
        { name: 'time', label: 'Time', field: 'time', align: 'left' },
        { name: 'description', label: 'Description', field: 'description', align: 'left' },
        { name: 'day', label: 'Day ID', field: 'day', align: 'left' }
      ]
    }
  },
  methods: {
    async showLogs() {
      try {
        const response = await api.getDayLogs()
        this.logs = response.data
        this.showLogsTable = true
        this.showEntriesTable = false
      } catch (err) {
        console.error(err)
        this.$q.notify({ type: 'negative', message: 'Failed to load day logs' })
      }
    },
    async showEntries() {
      try {
        const response = await api.getEntries()
        this.entries = response.data
        this.showEntriesTable = true
        this.showLogsTable = false
      } catch (err) {
        console.error(err)
        this.$q.notify({ type: 'negative', message: 'Failed to load entries' })
      }
    },
    viewDay(dayId) {
      this.$router.push({ path: `/day/${dayId}` })
    },
    logout() {
      // Remove JWT tokens
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      this.$q.notify({ type: 'positive', message: 'Logged out successfully' })
      this.$router.push({ name: 'LoginPage' })
    }
  }
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

/* Floating Logout Button */
.logout-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
}
</style>
