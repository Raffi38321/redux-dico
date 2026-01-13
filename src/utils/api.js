import axios from "axios";

const BASE_URL = "https://forum-api.dicoding.dev/v1";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function putAccessToken(token) {
  localStorage.setItem("accessToken", token);
}

function deleteAccessToken() {
  localStorage.removeItem("accessToken");
}

function getAccessToken() {
  return localStorage.getItem("accessToken");
}

async function register({ email, name, password }) {
  const response = await api.post("/register", {
    email,
    name,
    password,
  });

  const { status, message, data } = response.data;
  if (status !== "success") {
    throw new Error(message);
  }

  return data.user;
}

async function login({ email, password }) {
  const response = await api.post("/login", {
    email,
    password,
  });

  const { status, message, data } = response.data;
  if (status !== "success") {
    throw new Error(message);
  }

  return data.token;
}

async function getProfile() {
  const response = await api.get("/users/me");

  const { status, message, data } = response.data;
  if (status !== "success") {
    throw new Error(message);
  }

  return data.user;
}

export default {
  putAccessToken,
  getAccessToken,
  register,
  login,
  getProfile,
  deleteAccessToken,
};
