
<template>
    <main>
        <div class="info">
            <header> @{{username}} </header>
            <h2 v-if="fullname"> {{fullname}} </h2>
        </div>

        <div class="response">
            <button @click="acceptRequest">
                <img class="accept" src="../../public/check.svg">
            </button>
            <button @click="rejectRequest">
                <img class="reject" src="../../public/reject.svg">
            </button>
        </div>
    </main>

</template>

<script>
export default {
  name: 'FriendRequestForm',
  props: {
    username: {
        type: String,
        required: true,
    },
    fullname: {
        type: String,
        required: false
    }
  },
  data() {
    return {
      alerts: {} 
    };
  },
  methods: {
    acceptRequest() {
        
    },
    rejectRequest() {

    },
    async request(params) {
      /**
       * Submits a request to the freet's endpoint
       * @param params - Options for the request
       * @param params.body - Body for the request, if it exists
       * @param params.callback - Function to run if the the request succeeds
       */
      const options = {
        method: params.method, headers: {'Content-Type': 'application/json'}
      };
      if (params.body) {
        options.body = params.body;
      }

      try {
        // const r = await fetch(`/api/freets/${this.freet._id}`, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

        this.editing = false;

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

.info {
    display: flex;
    align-items: left;
    flex-direction: column;
}

.response {
    display: flex;
    align-items: right;
    flex-direction: row;
}

</style>
