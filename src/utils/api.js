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

async function getAllUsers() {
  const response = await api.get("/users");
  const { status, data, message } = response.data;
  if (status !== "success") {
    throw new Error(message);
  }
  console.log("ini dari api", data.users);
  return data.users;
}

async function getAllThreads() {
  const response = await api.get("/threads");
  const { status, data, message } = response.data;
  if (status !== "success") {
    throw new Error(message);
  }
  console.log("ini dari api", data.threads);
  return data.threads;
}

async function createThread({ title, body, category }) {
  const response = await api.post("/threads", { title, body, category });
  const { status, data, message } = response.data;
  if (status !== "success") {
    throw new Error(message);
  }
  return data.thread;
}

export default {
  createThread,
  getAllThreads,
  getAllUsers,
  putAccessToken,
  getAccessToken,
  register,
  login,
  getProfile,
  deleteAccessToken,
};
