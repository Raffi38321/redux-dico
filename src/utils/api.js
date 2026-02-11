import axios from 'axios';

const BASE_URL = 'https://forum-api.dicoding.dev/v1';

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
  localStorage.setItem('accessToken', token);
}

function deleteAccessToken() {
  localStorage.removeItem('accessToken');
}

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

async function register({email, name, password}) {
  const response = await api.post('/register', {
    email,
    name,
    password,
  });

  const {status, message, data} = response.data;
  if (status !== 'success') {
    throw new Error(message);
  }

  return data.user;
}

async function login({email, password}) {
  const response = await api.post('/login', {
    email,
    password,
  });

  const {status, message, data} = response.data;
  if (status !== 'success') {
    throw new Error(message);
  }

  return data.token;
}

async function getProfile() {
  const response = await api.get('/users/me');

  const {status, message, data} = response.data;
  if (status !== 'success') {
    throw new Error(message);
  }

  return data.user;
}

async function getAllUsers() {
  const response = await api.get('/users');
  const {status, data, message} = response.data;
  if (status !== 'success') {
    throw new Error(message);
  }
  console.log('ini dari api', data.users);
  return data.users;
}

async function getAllThreads() {
  const response = await api.get('/threads');
  const {status, data, message} = response.data;
  if (status !== 'success') {
    throw new Error(message);
  }
  console.log('ini dari api', data.threads);
  return data.threads;
}

async function createThread({title, body, category}) {
  const response = await api.post('/threads', {title, body, category});
  const {status, data, message} = response.data;
  if (status !== 'success') {
    throw new Error(message);
  }
  return data.thread;
}

async function createComment(threadId, content) {
  const response = await api.post(`/threads/${threadId}/comments`, {content});
  const {status, data, message} = response.data;
  if (status !== 'success') {
    throw new Error(message);
  }
  return data.comment;
}

async function getLeaderBoards() {
  const response = await api.get('/leaderboards');
  const {status, data, message} = response.data;
  if (status !== 'success') {
    throw new Error(message);
  }
  return data.leaderboards;
}

async function upVoteThread(threadId) {
  const response = await api.post(`/threads/${threadId}/up-vote`);
  const {status, data, message} = response.data;
  if (status !== 'success') {
    throw new Error(message);
  }
  return data.vote;
}

async function downVoteThread(threadId) {
  const response = await api.post(`/threads/${threadId}/down-vote`);
  const {status, data, message} = response.data;
  if (status !== 'success') {
    throw new Error(message);
  }
  return data.vote;
}

async function neutralVoteThread(threadId) {
  const response = await api.post(`/threads/${threadId}/neutral-vote`);
  const {status, data, message} = response.data;
  if (status !== 'success') {
    throw new Error(message);
  }
  return data.vote;
}

async function upVoteComment(threadId, commentId) {
  const response = await api.post(
      `/threads/${threadId}/comments/${commentId}/up-vote`,
  );
  const {status, data, message} = response.data;
  if (status !== 'success') {
    throw new Error(message);
  }
  return data.vote;
}

async function downVoteComment(threadId, commentId) {
  const response = await api.post(
      `/threads/${threadId}/comments/${commentId}/down-vote`,
  );
  const {status, data, message} = response.data;
  if (status !== 'success') {
    throw new Error(message);
  }
  return data.vote;
}

async function neutralVoteComment(threadId, commentId) {
  const response = await api.post(
      `/threads/${threadId}/comments/${commentId}/neutral-vote`,
  );
  const {status, data, message} = response.data;
  if (status !== 'success') {
    throw new Error(message);
  }
  return data.vote;
}

async function getThreadDetail(threadId) {
  const response = await api.get(`/threads/${threadId}`);
  const {status, data, message} = response.data;
  if (status !== 'success') {
    throw new Error(message);
  }
  return data.detailThread;
}

export default {
  getLeaderBoards,
  createThread,
  getThreadDetail,
  createComment,
  getAllThreads,
  getAllUsers,
  putAccessToken,
  getAccessToken,
  register,
  login,
  getProfile,
  deleteAccessToken,
  upVoteThread,
  downVoteThread,
  neutralVoteThread,
  upVoteComment,
  downVoteComment,
  neutralVoteComment,
};
