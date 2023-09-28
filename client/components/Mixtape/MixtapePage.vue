<!-- eslint-disable vue/max-attributes-per-line -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main v-if="mixtape !== null">
    <MixtapeComponent :key="mixtape._id" :mixtape="mixtape" />
  </main>
</template>

<script>
import MixtapeComponent from '@/components/Mixtape/MixtapeComponent.vue';

export default {
  name: 'MixtapePage',
  components: {MixtapeComponent},
  computed: {
    mixtape() {
      for (const mixtape of this.$store.state.profileMixtapes) {
        if (mixtape._id && mixtape._id === this.$route.params.mixtapeId) {
          return mixtape;
        }
      }
      return null;
    }
  },
  beforeMount() {
    //this.updating();
  },

  methods: {
    /**
     * Not sure if this is still necessary. Do not need to re-fetch mixtape if we have it locally already
     */
    async updating() {
      const urlMixtape =
        this.$route.params.username && this.$route.params.date
          ? `/api/mixtape/${this.$route.params.username}?date=${this.$route.params.date}`
          : `/api/profile?username=${this.$store.state.username}`;

      try {
        const rMixtape = await fetch(urlMixtape);
        const resMixtape = await rMixtape.json();

        if (!rMixtape.ok) {
          throw new Error(resMixtape.error);
        }

        this.mixtape = resMixtape;
      } catch (e) {}
    }
  }
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 0;
}

header,
header > * {
  display: flex;
  align-items: center;
}

button {
  padding: 10px;
  font-size: 20px;
  align-self: center;
  margin-top: 30px;
  border: solid 1px #ccc;
  background-color: #ccc;
  border-radius: 2px;
  width: 50%;
}

button:hover {
  background-color: rgb(54, 54, 54);
  color: white;
  border-color: rgb(54, 54, 54);
}

.info {
  margin: 0px;
}

.left {
  width: 30%;
}

.right {
  width: 70%;
}

.circle {
  display: inline-block;
  background-color: #ccc;
  margin: 10px;
  margin-bottom: 30px;
  border-radius: 50%;
}

.circle-inner {
  color: black;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  text-decoration: none;
  height: 250px;
  width: 250px;
  font-size: 120px;
}

.rectangle {
  display: inline-block;
  background-color: #ccc;
}

.rectangle-inner {
  margin: 2%;
  color: black;
  height: 400px;
  width: 800px;
  display: flex;
  flex-wrap: wrap;
}

.user-info {
  text-align: center;
}
</style>
