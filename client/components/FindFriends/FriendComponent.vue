<template>
  <article v-if="profileCircleText !== null" class="friend">
    <div class="circle">
      <p class="circle-inner">{{ profileCircleText }}</p>
    </div>
    <h3 class="author " v-if="this.$store.state.friends.includes(friend)">
      <router-link
        style="text-decoration: none; color: black"
        :to="{name: 'Profile', params: {name: friend}}"
      >
        <span v-on:click="goToProfile"> @{{ friend }} </span>
      </router-link>
    </h3>
    <h3 class="author" v-else> @{{ friend }}</h3>
    <div class="filler"></div>
    <div class="right">
      <button class="button-deny" @click="removeFriend" v-if="confirmed">
        Remove Friend
      </button>

      <button @click="acceptFriend" v-if="!confirmed && requested">
        Accept
      </button>
      <button
        class="button-deny"
        @click="rejectFriend"
        v-if="!confirmed && requested"
      >
        Reject
      </button>

      <button @click="sendFriendRequest" v-if="!confirmed && !requested">
        + Add Friend
      </button>
    </div>

    <section class="alerts">
      <article
        v-for="(status, alert, index) in alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </article>
  <article v-else class="friend">
    <i class="fas fa-circle-notch fa-spin fa-2x loading" />
  </article>
</template>

<script>
// create song component that will show the image of the album ,
// loop over that

export default {
  name: 'FriendComponent',
  components: {},
  props: {
    // Data from the stored mixtape
    friend: {
      type: String,
      required: true
    },
    confirmed: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    requested() {
      return this.$store.state.friendRequests.includes(this.friend);
    }
  },
  data() {
    return {
      profileCircleColor: null,
      profileCircleText: null,
      alerts: {} // Displays success/error messages encountered during freet modification
    };
  },
  async beforeMount() {
    const url = `/api/profile?username=${this.friend}`;
    const res = await fetch(url).then(async (r) => r.json());
    if (res.iconText === undefined) {
      this.profileCircleText = res.fullName ? res.fullName[0] : this.friend[0];
    } else {
      this.profileCircleText = res.iconText;
    }
    if (res.iconColor === undefined) {
      this.profileCircleColor = '#ccc';
    } else {
      this.profileCircleColor = res.iconColor;
    }
  },
  methods: {
    goToProfile() {
      this.$store.commit('refreshProfile', this.friend);
      this.$store.commit('setProfilePopUp', false);
    },
    delete() {
      /**
       * Deletes this mixtape.
       */
      const params = {
        url: `/api/friend/${this.$store.state.username}?user=${this.friend}`,
        method: 'DELETE',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully deleted mixtape!',
            status: 'success'
          });
        }
      };
      this.request(params);
    },
    removeFriend() {
      /**
       * removes friend
       */
      const params = {
        url: `/api/friend/${this.$store.state.username}?user=${this.friend}`,
        method: 'DELETE',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully removed friend.',
            status: 'success'
          });
        }
      };
      this.request(params);
    },
    acceptFriend() {
      /**
       * accepts friend request
       */
      const params = {
        url: `/api/friend/${this.$store.state.username}?user=${this.friend}&confirmed=true`,
        method: 'PATCH',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully accepted friend request!',
            status: 'success'
          });
        }
      };
      this.request(params);
    },
    rejectFriend() {
      /**
       * rejects friend request
       */
      const params = {
        url: `/api/friend/${this.$store.state.username}?user=${this.friend}&confirmed=false`,
        method: 'PATCH',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully accepted rejected friend request.',
            status: 'success'
          });
        }
      };
      this.request(params);
    },
    sendFriendRequest() {
      /**
       * send new friend request
       */
      const params = {
        url: `/api/friend/${this.$store.state.username}?user=${this.friend}`,
        method: 'POST',
        callback: () => {
          this.$store.commit('alert', {
            message: 'Successfully sent sent friend request.',
            status: 'success'
          });
        }
      };
      this.request(params);
    },
    async request(params) {
      /**
       * Submits a request to the freet's endpoint
       * @param params - Options for the request
       * @param params.body - Body for the request, if it exists
       * @param params.callback - Function to run if the the request succeeds
       */
      const options = {
        method: params.method,
        headers: {'Content-Type': 'application/json'}
      };
      if (params.body) {
        options.body = params.body;
      }

      try {
        const r = await fetch(params.url, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }
        this.$store.commit('refreshFriends');
        this.$store.commit('refreshFriendRequests');
        this.$store.commit('refreshPossibleFriends');
        params.callback();
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.right {
  display: flex;
  /* float: right; */
}
.friend {
  display: flex;
  padding: 10px;
  margin-bottom: 20px;
  border: solid 2px rgb(197, 197, 197);
  border-radius: 12px;
  width: 100%;
  background-color: white;
}

.author {
  display: flex;
}

button {
  background-color: rgb(255, 255, 255);
  border: solid 2px rgb(211, 211, 211);
  border-radius: 8px;
  margin: 0 8px;
}

.button-deny {
  background-color: rgb(255, 255, 255);
  border: solid 2px rgb(211, 211, 211);
  border-radius: 8px;
  margin: 0 8px;
}

button:hover {
  border-color: #1aeeab;
  background-color: rgb(255, 255, 255);
  border-width: 2px;
  color: #00c385;
}

.button-deny:hover {
  border-color: #ff4157;
  background-color: rgb(255, 255, 255);
  border-width: 2px;
  color: #e9112a;
}

.circle {
  background-color: v-bind(profileCircleColor);
  margin-top: 5px;
  margin-right: 10px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
}

.circle-inner {
  color: black;
  display: table-cell;
  align-content: center;
  vertical-align: middle;
  text-align: center;
  text-decoration: none;
  height: 60px;
  width: 60px;
  font-size: 22px;
}

.filler {
  flex-grow: 1;
}

.loading{
  
  margin: auto
}
</style>
