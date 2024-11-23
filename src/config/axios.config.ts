import axios from "axios";

// URL base
const BASE_URL = "http://localhost:8080/";

// Instancia con autorización
const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});


// Intancia para login
const axiosLogin = axios.create({
  method: "post",
  baseURL: BASE_URL,
  withCredentials: true,
});

export { axiosAuth, axiosLogin };
