import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

// import example from './module-example'
import StoreModule from "./module-example/store";

Vue.use(Vuex);

//axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.baseURL = "https://chat-app-mra.herokuapp.com";
const io = require("socket.io-client");
//const socket = io(axios.defaults.baseURL);

Vue.prototype.$socket = io(axios.defaults.baseURL);

/* 
import VueSocketIO from "vue-socket.io";

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: io("http://localhost:4000") //options object is Optional
  })
);

new Vue({
  sockets: {
    connect: function() {
      console.log("socket connected");
    },
    customEvent: function(data) {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)'
      );
    }
  },
  methods: {
    clickButton: function(data) {
      // $socket is socket.io-client instance
      this.$socket.emit("emit_method", data);
    }
  }
}); */
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      StoreModule
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  });

  return Store;
}
