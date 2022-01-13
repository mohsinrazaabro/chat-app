const state = {
  room: "",
  username: "",
  page: ""
};

const mutations = {
  setUsername(state, payload) {
    state.username = payload;
  },
  setRoom(state, payload) {
    state.room = payload;
  },
  setPage(state, payload) {
    state.page = payload;
  }
};

const actions = {
  setUsername(state, payload) {
    state.commit("setUsername", payload);
  },
  setRoom(state, payload) {
    state.commit("setRoom", payload);
  },

  setPage(state, payload) {
    state.commit("setPage", payload);
  }
};

const getters = {
  getUsername(state) {
    return state.username;
  },
  getRoom(state) {
    return state.room;
  },
  getPage(state) {
    return state.page;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
