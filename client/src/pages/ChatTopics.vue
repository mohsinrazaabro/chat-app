<template>
  <q-page class=" q-pa-md bg-grey-4">
    <div class="row q-col-gutter-md q-pa-md">
      <div
        class=" col-lg-3 col-md-4 col-sm-6 col-xs-12"
        v-for="(val, idx) in topics"
        :key="idx"
      >
        <q-img :src="val.img" class="image-topic" @click="goToRoom(val.title)">
          <div
            style="font-size: 2rem;"
            class="absolute-bottom text-subtitle2 text-center"
          >
            {{ val.title }}
          </div>
        </q-img>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
const topics = [
  {
    img:
      "https://images.unsplash.com/photo-1537498425277-c283d32ef9db?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1357&q=80",
    title: "Computer Science"
  },
  {
    img:
      "https://images.unsplash.com/photo-1611421964776-f33860ba2894?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=965&q=80",
    title: "Pixel art"
  },
  {
    img:
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=653&q=80",
    title: "Art"
  },
  {
    img:
      "https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    title: "History"
  },

  {
    img:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    title: "Music"
  },
  {
    img:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80",
    title: "Games"
  },
  {
    img:
      "https://images.unsplash.com/39/lIZrwvbeRuuzqOoWJUEn_Photoaday_CSD%20(1%20of%201)-5.jpg?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    title: "Business Ideas"
  },
  {
    img:
      "https://images.unsplash.com/photo-1501116518234-f32f28802bd1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=948&q=80",
    title: "MMA"
  },
  {
    img:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1447&q=80",
    title: "Cars"
  },
  {
    img:
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    title: "Bikes"
  },
  {
    img:
      "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
    title: "Soccer"
  },
  {
    img:
      "https://images.unsplash.com/photo-1512719994953-eabf50895df7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=670&q=80",
    title: "Cricket"
  }
];

export default {
  name: "chattopics",
  computed: {
    ...mapGetters("StoreModule", ["getUsername", "getRoom"])
  },
  data() {
    return {
      topics
    };
  },
  methods: {
    ...mapActions("StoreModule", ["setPage", "setRoom"]),
    goToRoom(roomName) {
      const username = this.getUsername;
      if (!username)
        return this.warning("Please add username from home first!");

      this.setRoom(roomName);
      this.setPage(`Topic: ${roomName}`);
      this.$router.push("/chat");
    },
    warning(message) {
      this.$q.notify({
        message,
        color: "red"
      });
    }
  },
  created() {
    this.setPage("Chat Topics");
  }
};
</script>

<style lang="scss">
.image-topic {
  height: 240px;
  border-radius: 6px;
  border: rgba(0, 0, 0, 0.185) 1px solid;
  /*  box-shadow: 5px 5px rgba($color: #000000, $alpha: 0.5); */
}
</style>
