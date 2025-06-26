// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.10:8080", // Use o IP da sua máquina
});

export default api;
