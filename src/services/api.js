import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // must match Django API
});

export default {
  getDayLogs: () => apiInstance.get("days/"),   // <-- "days/", NOT "daylogs/"
  getDay: (id) => apiInstance.get(`days/${id}/`),
  getEntries: (params) => apiInstance.get("entries/", { params }),
  createEntry: (data) => apiInstance.post("entries/", data),
};
