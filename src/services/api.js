import axios from "axios";

// Create a single Axios instance
const apiInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // must match Django API
})

apiInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token')

  // URLs that MUST NOT have a Bearer token
  const noAuthNeeded = ["register/", "token/", "token/refresh/"]

  // If URL contains any of these, do NOT attach token
  const skipAuth = noAuthNeeded.some(path => config.url.includes(path))

  if (!skipAuth && token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})


export default {
  // Day endpoints
  getDayLogs: () => apiInstance.get("days/"),   // <-- correct path
  getDay: (id) => apiInstance.get(`days/${id}/`),

  // Entry endpoints
  getEntries: (params) => apiInstance.get("entries/", { params }),
  createEntry: (data) => apiInstance.post("entries/", data),

  // Auth endpoints
  register: (data) => apiInstance.post("register/", data),
  login: (data) => apiInstance.post("token/", data),
  refreshToken: (data) => apiInstance.post("token/refresh/", data),
}
