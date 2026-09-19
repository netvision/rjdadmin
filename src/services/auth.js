import { reactive, readonly } from "vue";
import { api, setCsrfToken } from "../boot/axios";

const mutableState = reactive({
  admin: null,
  initialized: false,
});

let initialization = null;

const applySession = (admin) => {
  mutableState.admin = admin || null;
  setCsrfToken(admin?.csrf_token);
};

const clearSession = () => {
  applySession(null);
};

const ensureSession = async () => {
  if (mutableState.initialized) return mutableState.admin;
  if (!initialization) {
    initialization = api
      .get("/auth/me")
      .then(({ data }) => {
        applySession(data);
        return data;
      })
      .catch((error) => {
        clearSession();
        if (error.response?.status !== 401) throw error;
        return null;
      })
      .finally(() => {
        mutableState.initialized = true;
        initialization = null;
      });
  }
  return initialization;
};

const login = async (username, password) => {
  const { data } = await api.post("/auth/login", { username, password });
  applySession(data);
  mutableState.initialized = true;
  return data;
};

const changePassword = async (currentPassword, newPassword) => {
  await api.post("/auth/change-password", {
    current_password: currentPassword,
    new_password: newPassword,
  });
  clearSession();
  mutableState.initialized = true;
};

const logout = async () => {
  try {
    await api.post("/auth/logout");
  } finally {
    clearSession();
    mutableState.initialized = true;
  }
};

const authState = readonly(mutableState);

export { authState, changePassword, ensureSession, login, logout };
