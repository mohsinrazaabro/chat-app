<template>
  <div class="flex column my-font">
    <q-scroll-area
      ref="scrollAreaChat"
      class="col-7 "
      style=" height: 70vh;  max-height: 70vh;"
    >
      <div v-for="(val, idx) in recievedMsgs" :key="idx">
        <q-chat-message
          v-if="val.username != getUsername"
          :name="val.username"
          avatar="https://cdn.quasar.dev/img/avatar5.jpg"
          :text="[val.msg]"
          :stamp="formatDate(val.date)"
          text-color="white"
          bg-color="primary"
        />
        <q-chat-message
          v-if="val.username == getUsername"
          :name="val.username"
          avatar="https://cdn.quasar.dev/img/avatar5.jpg"
          :text="[val.msg]"
          :stamp="formatDate(val.date)"
          text-color="white"
          bg-color="green"
          sent
        />
      </div>
    </q-scroll-area>
    <q-form class="col-4 buttons" @submit="sendMsg">
      <q-input outlined v-model="message" label="Write Message Here" />
      <q-btn flat type="submit" style="color: #FF0080" label="Send" />
    </q-form>
  </div>
</template>

<script>
import axios from "axios";
//const io = require("socket.io-client");
//const socket = io(axios.defaults.baseURL);

import { mapGetters, mapActions } from "vuex";
import { date } from "quasar";

export default {
  name: "chat",
  data() {
    return {
      recievedMsgs: this.$recievedMsgs,
      message: "",
      username: "",
      position: 100,
      room: "nice"
    };
  },
  computed: {
    ...mapGetters("StoreModule", ["getUsername", "getRoom"])
  },
  methods: {
    ...mapActions("StoreModule", ["setUsername", "setRoom"]),
    scrollToBottom() {
      let scrollSize = this.$refs.scrollAreaChat.scrollSize;
      this.$refs.scrollAreaChat.setScrollPosition(scrollSize, 300);
    },
    async connectToSocket() {
      this.$socket.removeAllListeners();
      const room = this.getRoom;
      const username = this.getUsername;
      this.$socket.emit("updateUsername", username);
      this.$socket.emit("joinRoom", room);
      this.$socket.on("getmsgs", data => {
        this.recievedMsgs = data.msgs;
      });
      console.log(this.$recievedMsgs);

      this.$socket.on("message", data => {
        console.log(data);
        this.recievedMsgs.push({
          msg: data.msg,
          username: data.username
        });
      });
    },
    formatDate(timeStamp) {
      const formattedDate = date.formatDate(timeStamp, "YYYY MMMM DD    mm:ss");
      return formattedDate;
    },
    sendMsg() {
      this.$socket.emit("chatMessage", this.message);
      this.message = "";
    },
    warning(message) {
      this.$q.notify({
        message,
        color: "red"
      });
    }
  },
  created() {
    this.connectToSocket();
    setTimeout(() => {
      this.scrollToBottom();
    }, 1000);
  }
};
</script>

<style>
.buttons {
  height: 10vh;
  max-height: 10vh;
}
</style>
