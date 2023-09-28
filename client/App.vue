<template>
  <div id="app">
    <header>
      <NavBar />
    </header>
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar.vue';

export default {
  name: 'App',
  components: {NavBar},
  beforeCreate() {
    // Sync stored username to current session
    fetch('/api/users/session', {
      credentials: 'same-origin' // Sends express-session credentials with request
    })
      .then((res) => res.json())
      .then((res) => {
        const user = res.user;
        this.$store.commit('setUsername', user ? user.username : null);
        this.$store.commit('setUserId', user ? user._id : null);
      });

    // Check if the user has created a post today or not
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString('default', {month: 'long'});
    const year = date.getFullYear();
    const formattedDate = `${month} ${day}, ${year}`;

    fetch(`/api/mixtape/${this.$store.state.username}?date=${formattedDate}`)
      .then((response) => {
        if (response.status !== 404) {
          this.$store.commit('postMixtape');
        } else {
          this.$store.commit('resetMixtape');
        }
      })
      .then(() => {
        // Get feed ready for user
        this.$store.commit('refreshPrompt');
        this.$store.commit('refreshFeed');
        this.$store.commit('refreshFriends');
        this.$store.commit('refreshFavorites');
        this.$store.commit('refreshFriendRequests');
        this.$store.commit('refreshPossibleFriends');
        this.$store.commit('personalMixtapeRefresh');
        this.$store.commit('refreshLikes');
      });

    // Clear alerts on page refresh
    this.$store.state.alerts = {};
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  height: 100vh;
  flex-direction: column;
  display: flex;
  padding: 0;
  margin: 0;
  font-size: 1.2em;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #ffffff;
  color: rgb(0, 0, 0);
}

main {
  padding: 0 5em 5em;
}

.alerts {
  position: absolute;
  z-index: 99;
  bottom: 0;
  top: 100%;
  left: 50%;
  transform: translate(-50%, 10%);
  width: 100%;
  text-align: center;
}

.alerts article {
  border-radius: 5px;
  padding: 10px 20px;
  color: #fff;
}

.alerts p {
  margin: 0;
}

.alerts .error {
  background-color: rgb(166, 23, 33);
}

.alerts .success {
  background-color: rgb(45, 135, 87);
}
</style>
