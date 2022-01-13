<template>
  <q-page class="q-pa-md my-font">
    <h3>online users</h3>
    <q-list bordered>
      <q-item clickable v-ripple v-for="(val, idx) in users" :key="idx">
        <q-item-section>{{ val.username }}</q-item-section>
        <q-item-label caption>Room: {{ val.room }}</q-item-label>
        <q-item-section avatar>
          <q-avatar rounded>
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import axios from "axios";
export default {
  name: "OnlineUsers",
  data() {
    return {
      users: []
    };
  },
  methods: {
    getUsers() {
      axios.get("/users").then(res => {
        console.log(res.data);
        this.users = res.data.users;
      });
    }
  },
  created() {
    this.getUsers();
  }
};
</script>

<style></style>
