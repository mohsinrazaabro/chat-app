<template>
  <div class="q-pa-md paragraph-font">
    <div class="nav">
      <div class="search">
        <q-input outlined label="Search room" v-model="search" style="" />
        <q-btn class="search-btn" color="primary" icon="search" />
      </div>
    </div>
    <div class="navigations">
      <q-btn
        color="primary"
        @click="showCreateRoomDialog = !showCreateRoomDialog"
        :icon="showCreateRoomDialog ? 'close' : 'add'"
      />
    </div>
    <div v-if="showCreateRoomDialog">
      <q-input label="Create room" outlined v-model="roomname"> </q-input>
      <q-btn label="Create room" @click="createRoom"></q-btn>
    </div>

    <q-list bordered class="q-mt-md">
      <q-item
        class="q-my-sm"
        v-for="(val, idx) in rooms"
        :key="idx"
        clickable
        v-ripple
      >
        <q-item-section>
          <q-item-label>{{ val.roomname }}</q-item-label>
          <q-item-label caption lines="1">{{ val.username }}</q-item-label>
        </q-item-section>

        <q-item-section side @click="goToRoom(val.roomname)">
          <q-icon name="login" color="primary" />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "chat-rooms",

  data() {
    return { rooms: [], search: "", roomname: "", showCreateRoomDialog: false };
  },
  computed: {
    ...mapGetters("StoreModule", ["getUsername", "getPage"])
  },
  methods: {
    ...mapActions("StoreModule", ["setPage", "setRoom"]),
    goToRoom(roomName) {
      const username = this.getUsername;
      if (!username)
        return this.warning("Please add username from home first!");

      this.setRoom(roomName);
      this.setPage(`Room: ${roomName}`);
      this.$router.push("/chat");
    },
    connectToSocket() {
      this.$socket.emit("getRooms");
      this.$socket.on("getRooms", data => {
        this.rooms = data.rooms;
      });
    },
    createRoom() {
      const roomname = this.roomname;
      const username = this.getUsername;
      if (!username)
        return this.warning("Please add username from homepage first!");
      this.$socket.emit("createRoom", { roomname, username });
      this.connectToSocket();
      this.showCreateRoomDialog = false;
    },

    warning(message) {
      this.$q.notify({
        message,
        color: "red"
      });
    }
  },
  created() {
    this.setPage("Chat Rooms");
    this.connectToSocket();
  }
};
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: space-between;
  .search {
    display: flex;
  }
}
</style>
