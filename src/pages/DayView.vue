<template> 
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6">Day: {{ day?.date }}</div>
        <div v-if="day?.goal" class="text-subtitle2">Goal: {{ day.goal }}</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="text-subtitle1">Entries</div>
        <q-list bordered>
          <q-item v-for="entry in entries" :key="entry.id">
            <q-item-section>
              <div>{{ entry.time }} — {{ entry.description }}</div>
            </q-item-section>
          </q-item>
        </q-list>

        <q-form @submit.prevent="addEntry" class="q-mt-md">
          <q-input v-model="entryTime" label="Time (HH:MM:SS)" />
          <q-input v-model="entryDesc" label="Description" />
          <q-btn label="Add Entry" type="submit" class="q-mt-sm" />
        </q-form>
      </q-card-section>

    </q-card>
  </q-page>
</template>

<script>
import api from 'src/services/api'

export default {
  name: 'DayView',
  data() {
    return {
      day: null,
      entries: [],
      entryTime: '',
      entryDesc: ''
    }
  },
  async mounted() {
    const id = this.$route.params.id
    await this.loadDay(id)
  },
  methods: {
    // Load day details AND entries together
    async loadDay(id) {
      try {
        const resDay = await api.getDay(id)
        this.day = resDay.data

        // Fetch entries for this day
        const resEntries = await api.getEntries({ day: id })
        this.entries = resEntries.data
      } catch (err) {
        console.error(err)
        this.$q.notify({ type: 'negative', message: 'Failed to load day data' })
      }
    },

    async addEntry() {
      if (!this.entryTime || !this.entryDesc) {
        this.$q.notify({ type: 'warning', message: 'Time and description required' })
        return
      }

      try {
        await api.createEntry({
          day: this.$route.params.id,
          time: this.entryTime,
          description: this.entryDesc
        })

        // Clear inputs
        this.entryTime = ''
        this.entryDesc = ''

        // Refresh entries list
        await this.loadDay(this.$route.params.id)
      } catch (err) {
        console.error(err)
        this.$q.notify({ type: 'negative', message: 'Failed to create entry' })
      }
    }
  }
}
</script>