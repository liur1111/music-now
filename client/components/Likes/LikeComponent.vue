<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->

<template>
  <section class="like-container">
    <!-- {{ this.$store.state.likes[this.likedObjectId]['likers'].length }} -->
    <div v-if="userHasLiked" class="liked" @click="removeLike">
      <i class="fas fa-fire fa-2x like-info-container" />
      <p class="like-count">
        &nbsp;{{ mixtapeLikes.length }}
      </p>
    </div>
    <div v-else class="notLiked" @click="addLike">
      <i class="fas fa-fire fa-2x like-info-container" />
      <p class="like-count">
        &nbsp;{{ mixtapeLikes.length }}
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'LikeComponent',
  props: {
    mixtapeId: {type: String, required: true}
  },
  data() {
    return {};
  },
  computed: {
    /**
     * The Like object associated with the given likedObjectId
     */
    mixtapeLikes() {
      const likes = this.$store.state.likes;
      return likes.filter((like) => like.mixtapeId === this.mixtapeId)
    },
    /**
     * Compute if the user has liked the object with this.likedObjectId
     */
    userHasLiked() {
      const filtered = this.mixtapeLikes.filter((like) => like.username === this.$store.state.username);
      return filtered.length === 1
    }
  },
  methods: {
    async addLike() {
      await this.$store.commit('addLike', this.mixtapeId);
    },
    async removeLike() {
      await this.$store.commit('removeLike', this.mixtapeId);
    },
    async submit(remove = false) {
      /**
       * Submits a form with the specified options from data().
       */
      const options = {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        credentials: 'same-origin' // Sends express-session credentials with request
      };

      options.body = JSON.stringify({id: this.likedObjectId, remove: remove});

      try {
        const r = await fetch('/api/likes', options);
        if (!r.ok) {
          // If response is not okay, we throw an error and enter the catch block
          const res = await r.json();
          throw new Error(res.error);
        }
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>

<style scoped>
.header-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin: 20px;
  position: relative;
}
.header-big-text {
  font-size: 60px;
  font-weight: normal;
  margin: 15px 15px;
}
.header-small-text {
  font-size: 30px;
  font-weight: normal;
  margin: 5px 5px;
}
.like-container {
  position: absolute;
  z-index: 1;
  right: 40px;
  top: 40px;
}
.liked {
  color: #12de9d;
  display: flex;
  -webkit-animation-name: wiggle;
  -ms-animation-name: wiggle;
  -ms-animation-duration: 1000ms;
  -webkit-animation-duration: 1000ms;
  -webkit-animation-iteration-count: 1;
  -ms-animation-iteration-count: 1;
  -webkit-animation-timing-function: ease-in-out;
  -ms-animation-timing-function: ease-in-out;
}
.liked:hover {
  color: #75ebc5;
  cursor: pointer;
}

.notLiked {
  display: flex;
  color: rgb(0, 0, 0);
}
.notLiked:hover {
  color: #12de9d;
  cursor: pointer;
}

.like-count {
  flex-direction: row;
  font-size: 1.5em;
  margin-top: 5px;
}

.like-info-container {
  flex-direction: row;
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
