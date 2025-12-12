<template>
  <q-page class="q-pa-md">
    <q-btn label="Load Day Logs" color="primary" @click="loadLogs" />

    <div v-if="logs.length" class="q-mt-md">
      <q-list bordered>
        <q-item v-for="log in logs" :key="log.id" clickable @click="viewDay(log.id)">
          <q-item-section>
            <div class="text-h6">{{ log.date }}</div>
            <div>{{ log.goal }}</div>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <div v-else class="text-grey q-mt-md">
      No logs yet
    </div>
  </q-page>
</template>

<script lang="ts">
import api from "src/services/api";

export default {
  data() {
    return {
      logs: []
    };
  },

  methods: {
    async loadLogs() {
      try {
        const response = await api.getDayLogs();
        this.logs = response.data;
      } catch (err) {
        console.error("Error loading day logs:", err);
        this.$q.notify({
          type: "negative",
          message: "Failed to load day logs"
        });
      }
    },

    viewDay(id) {
      this.$router.push(`/day/${id}`);
    }
  }
};
</script>
