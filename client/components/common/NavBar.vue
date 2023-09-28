<!-- A basic navigation bar component -->
<!-- Example of a component which is included on all pages (via App.vue) -->
<!-- This navbar takes advantage of both flex and grid layouts for positioning elements; feel free to redesign as you see fit! -->

<template>
  <nav>
    <div class="left">
      <router-link to="/">
        <img src="../../public/logo-musicnow.png" />
      </router-link>
    </div>
    <div class="right">
      <router-link v-if="$store.state.username" to="/"> Feed </router-link>
      <router-link
        @click="refreshFriends"
        v-if="$store.state.username"
        to="/findFriends"
        >Friends
      </router-link>
      <router-link
        v-if="$store.state.username"
        :to="{name: 'Profile', params: {name: $store.state.username}}"
      >
        <span v-on:click="goToProfile"> Profile </span>
      </router-link>
      <router-link v-if="$store.state.username" to="/account">
        Settings
      </router-link>
      <router-link v-else to="/login"> Login </router-link>
    </div>
    <section class="alerts">
      <article
        v-for="(status, alert, index) in $store.state.alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  props: {},
  data() {
    return {};
  },
  created() {},
  methods: {
    goToProfile() {
      this.$store.commit('refreshProfile', this.$store.state.username);
    },
    refreshFriends() {
      this.$store.commit('refreshFriends');
      this.$store.commit('refreshFriendRequests');
      this.$store.commit('refreshPossibleFriends');
    }
  }
};
</script>

<style scoped>
nav {
  padding: 1vw 2vw;
  /* background-color: #ccc; */
  background-color: #7bebc8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

a {
  color: rgb(20, 20, 20);
  text-decoration: none;
}

.title {
  font-size: 32px;
  margin: 0 5px;
}

img {
  height: 31px;
  width: auto;
}

.settings {
  margin-top: 10px;
  height: 32px;
}
.profile {
  height: 27px;
  width: auto;
}
.friends {
  height: 27px;
  width: auto;
}
.left {
  display: flex;
  align-items: center;
}

.right {
  font-size: 20px;
  display: grid;
  gap: 16px;
  grid-auto-flow: column;
  align-items: center;
}

.right a {
  margin-left: 5px;
}

.alerts {
  width: 25%;
}
</style>
