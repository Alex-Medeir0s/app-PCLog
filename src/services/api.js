// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.60:8080", // Use o IP da sua máquina
});

export default api;
