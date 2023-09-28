<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<!-- Reusable component for displaying the Music Now header that shows today's date -->

<template>
  <section class="favorite-container circle">
    <p
      v-if="userHasFavorited"
      class="favorited circle-inner"
      @click="removeFavorite"
    >
      <i class="fas fa-bookmark bookmark" />
    </p>
    <p v-else class="notFavorited circle-inner" @click="addFavorite">
      <i class="fas fa-bookmark bookmark" />
    </p>
  </section>
</template>

<script>
export default {
  name: 'FavoriteComponent',
  props: {
    trackId: {
      type: String,
      required: false
    }
  },
  data() {
    return {};
  },
  computed: {
    /**
     * Compute if the user has favorited the object with this.favoritedObjectId
     */
    userHasFavorited() {
      let isFavorite = false;
      this.$store.state.favorites.forEach((favorite) => {
        if (favorite.song.trackId === this.trackId) {
          isFavorite = true;
        }
      });
      return isFavorite;
    }
  },
  methods: {
    addFavorite() {
      this.submit(false);
      this.$store.commit('refreshFavorites');
    },
    removeFavorite() {
      this.submit(true);
      this.$store.commit('refreshFavorites');
    },
    async submit(remove = false) {
      /**
       * Submits a form with the specified options from data().
       */
      const options = remove
        ? {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            credentials: 'same-origin' // Sends express-session credentials with request
          }
        : {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'same-origin' // Sends express-session credentials with request
          };
      options.body = JSON.stringify({
        username: this.$store.state.username,
        trackId: this.trackId
      });

      try {
        const r = await fetch(`/api/favorite`, options);
        if (!r.ok) {
          // If response is not okay, we throw an error and enter the catch block
          const res = await r.json();
          throw new Error(res.error);
        }
        this.$store.commit('refreshFavorites');
        if (this.$store.state.profileUsername === this.$store.state.username) {
          this.$store.commit('refreshProfile', this.$store.state.username);
        }
      } catch (e) {}
    }
  }
};
</script>

<style scoped>
.favorite-container {
  position: absolute;
  right: 15px;
  top: -12px;
  border-radius: 50%;
  background-color: white;
  cursor: pointer;
  filter: drop-shadow(0 2px 0.25rem rgba(0, 0, 0, 0.417));
}
.favorited {
  color: #12de9d;
  -webkit-animation-name: wiggle;
  -ms-animation-name: wiggle;
  -ms-animation-duration: 1000ms;
  -webkit-animation-duration: 1000ms;
  -webkit-animation-iteration-count: 1;
  -ms-animation-iteration-count: 1;
  -webkit-animation-timing-function: ease-in-out;
  -ms-animation-timing-function: ease-in-out;
}
.favorited:hover {
  color: #75ebc5;
  cursor: pointer;
}

.notFavorited {
  color: rgb(0, 0, 0);
}
.notFavorited:hover {
  color: #12de9d;
  cursor: pointer;
}

.circle-inner {
  display: table-cell;
  text-decoration: none;
  height: 30px;
  width: 30px;
}

.bookmark {
  margin-top: 20%;
}

@-webkit-keyframes wiggle {
  0% {
    -webkit-transform: rotate(10deg);
  }
  25% {
    -webkit-transform: rotate(-10deg);
  }
  50% {
    -webkit-transform: rotate(20deg);
  }
  75% {
    -webkit-transform: rotate(-5deg);
  }
  100% {
    -webkit-transform: rotate(0deg);
  }
}

@-ms-keyframes wiggle {
  0% {
    -ms-transform: rotate(1deg);
  }
  25% {
    -ms-transform: rotate(-1deg);
  }
  50% {
    -ms-transform: rotate(1.5deg);
  }
  75% {
    -ms-transform: rotate(-5deg);
  }
  100% {
    -ms-transform: rotate(0deg);
  }
}

@keyframes wiggle {
  0% {
    transform: rotate(10deg);
  }
  25% {
    transform: rotate(-10deg);
  }
  50% {
    transform: rotate(20deg);
  }
  75% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
