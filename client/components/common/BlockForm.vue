<!-- eslint-disable vue/html-self-closing -->
<!-- eslint-disable vue/max-attributes-per-line -->
<!-- Reusable component representing a form in a block style -->
<!-- This is just an example; feel free to define any reusable components you want! -->

<template>
  <form @submit.prevent="submit">
    <h3 v-if="showTitle">{{ title }}</h3>
    <article v-if="fields.length">
      <div v-for="field in fields" :key="field.id">
        <label :for="field.id">{{ field.label }}:</label>
        <textarea
          v-if="field.id === 'content'"
          :name="field.id"
          :value="field.value"
          @input="field.value = $event.target.value"
        />
        <input
          v-else
          :type="field.id === 'password' ? 'password' : 'text'"
          :name="field.id"
          :value="field.value"
          @input="field.value = $event.target.value"
        />
      </div>
    </article>
    <article v-else>
      <p>{{ content }}</p>
    </article>
    <button type="submit">
      {{ title }}
    </button>
    <section class="alerts">
      <article
        v-for="(status, alert, index) in alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </form>
</template>

<script>
export default {
  name: 'BlockForm',
  data() {
    /**
     * Options for submitting this form.
     */
    return {
      url: '', // Url to submit form to
      method: 'GET', // Form request method
      hasBody: false, // Whether or not form request has a body
      setUsername: false, // Whether or not stored username should be updated after form submission
      resetMixtape: false, // Whether or not stored freets should be updated after form submission
      refreshComments: '', // mixtapeId for respective comments. Exists if stored comments should be updated after form submission
      alerts: {}, // Displays success/error messages encountered during form submission
      callback: null, // Function to run after successful form submission
      showTitle: true
    };
  },
  methods: {
    async submit() {
      /**
       * Submits a form with the specified options from data().
       */
      const options = {
        method: this.method,
        headers: {'Content-Type': 'application/json'},
        credentials: 'same-origin' // Sends express-session credentials with request
      };
      if (this.hasBody) {
        options.body = JSON.stringify(
          Object.fromEntries(
            this.fields.map((field) => {
              const {id, value} = field;
              field.value = '';
              return [id, value];
            })
          )
        );
      }

      try {
        const r = await fetch(this.url, options);
        if (!r.ok) {
          // If response is not okay, we throw an error and enter the catch block
          const res = await r.json();
          throw new Error(res.error);
        }

        if (this.setUsername) {
          const text = await r.text();
          const res = text ? JSON.parse(text) : {user: null};
          this.$store.commit(
            'setUsername',
            res.user ? res.user.username : null
          );
          // dont forget to set the user Id
          this.$store.commit('setUserId', res.user ? res.user._id : null);
          this.$store.commit('refreshPrompt');
          this.$store.commit('refreshFeed');
          this.$store.commit('refreshFriends');
          this.$store.commit('refreshFavorites');
          this.$store.commit('refreshFriendRequests');
          this.$store.commit('refreshProfile');
          this.$store.commit('refreshPossibleFriends');
          this.$store.commit('personalMixtapeRefresh');
        }

        if (this.resetMixtape) {
          this.$store.commit('resetMixtape');
          // Check if the user has created a post today or not
          const date = new Date();
          const day = date.getDate();
          const month = date.toLocaleString('default', {month: 'long'});
          const year = date.getFullYear();
          const formattedDate = `${month} ${day}, ${year}`;

          fetch(
            `/api/mixtape/${this.$store.state.username}?date=${formattedDate}`
          ).then((response) => {
            if (response.status !== 404) {
              this.$store.commit('postMixtape');
            }
          });
        }

        if (this.refreshComments && this.refreshComments.length > 0) {
          const mixtapeId = this.refreshComments;
          this.$store.commit('setComments', mixtapeId);
        }

        if (this.callback) {
          this.callback();
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
form {
  border: 1px solid rgb(176, 176, 176);
  border-radius: 4px;
  padding: 2rem 4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 14px;
  position: relative;
  background-color: white;
}

article > div {
  display: flex;
  flex-direction: column;
}

input {
  height: 2em;
  margin-bottom: 16px;
  border: 1px solid rgb(153, 153, 153);
  border-radius: 2px;
  background-color: rgb(249, 249, 249);
}

label {
  font-size: 18px;
  margin-bottom: 4px;
}

button {
  font-size: 15px;
  padding: 4px;
  margin-top: 8px;
  height: 2em;
  border: solid 1px rgb(192, 192, 192);
  border-radius: 4px;
  background-color: rgb(255, 255, 255);
}

button:hover {
  border-color: #1aeeab;
  background-color: rgb(255, 255, 255);
  border-width: 2px;
  color: #00c385;
}

form > article p {
  margin: 0;
}

form h3,
form > * {
  margin: 0.3em 0;
}

form h3 {
  margin-top: 0;
}

textarea {
  font-family: inherit;
  font-size: inherit;
}
</style>
