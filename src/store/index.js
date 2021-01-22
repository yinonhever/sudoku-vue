import { createStore } from "vuex";
import axios from "axios";
import { checkResult } from "../util/functions";

export default createStore({
  state: {
    user: {},
    level: null,
    finished: false,
    success: false
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    removeUser(state) {
      state.user = {};
    },
    setLevel(state, payload) {
      state.level = payload;
    },
    finishGame(state, payload) {
      state.finished = true;
      state.success = payload.success;
      state.user.score += payload.pointsAdded;
    },
    restartGame(state) {
      state.finished = false;
      state.level = null;
    }
  },
  actions: {
    async login(context, payload) {
      const { email, password } = payload;
      const authReq = axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDSDS_F7tUc8QEbBwy-HiHu8Wy1Su3adQw", {
        email,
        password,
        returnSecureToken: true
      });
      const profileReq = axios.get("https://sudoku-6c11e.firebaseio.com/profiles.json");
      const [authRes, profileRes] = await axios.all([authReq, profileReq]);
      const profiles = [];
      for (let key in profileRes.data) {
        profiles.push({ id: key, ...profileRes.data[key] });
      }
      const matchingUser = profiles.find(user => user.email === email);
      if (!matchingUser) throw new Error();

      const { id, name, score } = matchingUser;
      const { idToken, expiresIn } = authRes.data;
      const expirationDate = new Date(Date.now() + expiresIn * 1000);
      const user = { id, name, score, idToken };
      context.commit("setUser", user);

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("expirationDate", expirationDate);
    },
    async signup(context, payload) {
      const { name, email, password } = payload;
      const authRes = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDSDS_F7tUc8QEbBwy-HiHu8Wy1Su3adQw", {
        email,
        password,
        returnSecureToken: true
      });
      const profileRes = await axios.post(
        `https://sudoku-6c11e.firebaseio.com/profiles.json?auth=${authRes.data.idToken}`,
        { name, email, score: 0 }
      );

      const { idToken, expiresIn } = authRes.data;
      const expirationDate = new Date(Date.now() + expiresIn * 1000);
      const user = { id: profileRes.data.name, name, score: 0, idToken };
      context.commit("setUser", user);

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("expirationDate", expirationDate);
    },
    logout(context) {
      context.commit("removeUser");
      localStorage.clear();
    },
    tryAutoLogin(context) {
      const user = JSON.parse(localStorage.getItem("user"));
      const { expirationDate } = localStorage;
      if (!user || !expirationDate) return;
      const timeLeft = new Date(expirationDate).getTime() - Date.now();
      if (timeLeft <= 0) {
        localStorage.clear();
        return;
      }
      context.commit("setUser", user);
    },
    startGame(context, payload) {
      context.commit("setLevel", payload);
    },
    finishGame(context, payload) {
      const success = checkResult(payload.targetBoard, payload.userBoard);
      let pointsAdded;
      if (success) {
        const { level } = context.state;
        pointsAdded = level === 1 ? 3 : level === 2 ? 10 : 20;
      } else {
        pointsAdded = 0;
      }
      context.commit("finishGame", { success, pointsAdded });

      const user = JSON.parse(localStorage.getItem("user"));
      user.score += pointsAdded;
      localStorage.setItem("user", JSON.stringify(user));

      const { id: userId, idToken } = context.state.user;
      axios.patch(
        `https://sudoku-6c11e.firebaseio.com/profiles/${userId}.json?auth=${idToken}`,
        { score: user.score }
      );
    },
    restartGame(context) {
      context.commit("restartGame");
    }
  },
  getters: {
    isAuth(state) {
      return !!state.user.idToken && !!state.user.name;
    },
    user(state) {
      return state.user;
    },
    level(state) {
      return state.level;
    },
    finished(state) {
      return state.finished;
    },
    success(state) {
      return state.success;
    }
  }
});