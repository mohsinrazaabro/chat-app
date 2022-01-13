<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="toolbar my-font">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title class="paragraph-font">
          {{ getPage }}
        </q-toolbar-title>
        <div>{{ getUsername }}</div>
        <!--  <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="paragraph-font"
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Essential Links
        </q-item-label>

        <q-item clickable v-ripple @click="GoTo('/', 'Home')">
          <q-item-section avatar>
            <q-icon color="primary" name="home" />
          </q-item-section>

          <q-item-section>Homepage</q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="GoTo('/online', 'Online Users')">
          <q-item-section avatar>
            <q-icon color="primary" name="person" />
          </q-item-section>

          <q-item-section>Online Users</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="GoTo('/chattopics', 'Chat Topics')">
          <q-item-section avatar>
            <q-icon color="primary" name="topic" />
          </q-item-section>

          <q-item-section>Chat Topics</q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="GoTo('/chatrooms', 'Chat Rooms')">
          <q-item-section avatar>
            <q-icon color="primary" name="meeting_room" />
          </q-item-section>

          <q-item-section>Chat Rooms</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MainLayout",
  computed: {
    ...mapGetters("StoreModule", ["getUsername", "getPage"])
  },
  data() {
    return {
      leftDrawerOpen: false,
      Page: "Quasar App"
    };
  },
  methods: {
    GoTo(address, title) {
      this.Page = title;
      this.$router.push(address);
    }
  }
};
</script>

<style lang="scss" scoped>
.toolbar {
  background: rgba(255, 255, 255, 0.6);
  color: black;
  backdrop-filter: blur(6px);
}
</style>
