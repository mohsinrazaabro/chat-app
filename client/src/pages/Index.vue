<template>
  <q-page class="flex column flex-center ">
    <h4 v-if="getUsername" class="paragraph-font">
      Welcome to Chat App, {{ getUsername }}!
    </h4>

    <div class="btns q-ma-sm" v-if="getUsername">
      <q-btn
        color="primary"
        label="Online Users"
        @click="goTo('/online', 'Online Users')"
      />
      <q-btn
        color="primary"
        label="Chat Topics"
        @click="goTo('/chattopics', 'Chat Topics')"
      />
      <q-btn
        color="primary"
        label="Chat Rooms"
        @click="goTo('/chatrooms', 'Chat Rooms')"
      />
    </div>

    <p v-if="!getUsername" class="paragraph-font">Your Fine Name</p>
    <q-input v-if="!getUsername" outlined v-model="text" size="22rem" />
    <q-btn
      v-if="!getUsername"
      @click="Confirm()"
      class="q-ma-md"
      label="Continue"
      color="primary"
    />
    <h6 class="my-font">Chat App with Socket.io</h6>
    <p class="my-font">https://github.com/mohsinrazaabro</p>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "PageIndex",
  data() {
    return {
      text: "",
      confirm: false
    };
  },
  computed: {
    ...mapGetters("StoreModule", ["getUsername"])
  },
  methods: {
    ...mapActions("StoreModule", ["setUsername", "setPage"]),
    goTo(address, title) {
      this.setPage(title);
      this.$router.push(address);
    },
    Confirm() {
      if (this.text.length < 4) {
        return this.$q.notify({
          message: "Name too small!",
          color: "red"
        });
      }
      const username = this.text;
      this.$socket.emit("updateUsername", username);
      this.setUsername(this.text);
      this.confirm = true;
    }
  },
  created() {
    this.setPage("Home");
  }
};
</script>
