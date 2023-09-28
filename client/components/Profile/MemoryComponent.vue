<template>
  <!-- <router-link
    class="memory"
    style="text-decoration: none; color: black"
    :to="{name: 'Comments', params: {mixtapeId: mixtape._id, isMemory: this.mixtape.date}}"
  > -->
  <router-link
    class="memory"
    style="text-decoration: none; color: black"
    :to="{path: `/comments/${mixtape._id}`, query: {memory: true}}"
  >
    <img
      class="square"
      v-if="mixtape.songs[0].albumCover"
      :src="mixtape.songs[0].albumCover"
    />
    <img
      class="square"
      v-else-if="mixtape.songs[1].albumCover"
      :src="mixtape.songs[1].albumCover"
    />
    <img
      class="square"
      v-else-if="mixtape.songs[2].albumCover"
      :src="mixtape.songs[2].albumCover"
    />
    <div class="content">
      {{ this.displayDate }}
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'MemoryComponent',
  components: {},
  props: {
    // Data from the stored mixtape
    mixtape: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      displayDate: this.mixtape.date
    };
  },
  beforeMount() {
    this.parseDate();
  },
  methods: {
    parseDate() {
      this.displayDate = this.mixtape.date.slice(0, -6);
    }
  }
};
</script>

<style scoped>
img {
  filter: drop-shadow(0 4px 0.25rem rgb(171, 171, 171));
}
.content {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.memory {
  margin: 2%;
  /* border: solid 3px rgb(176, 176, 176);
  background-color: rgb(176, 176, 176); */
  /* border: solid 3px #009965;
  background-color: #009965; */
  background-color: #e0e0e0;
  border-radius: 8px;
  height: 44%;
  width: 20%;
  font-weight: bold;
}
.memory:hover {
  /* background-color: rgb(84, 84, 84);
  border-color: rgb(84, 84, 84); */
  color: white;
  background-color: rgb(239, 239, 239);
  border-color: #4ed8aa;
  border-width: 2px;
  border-style: solid;
}

.square {
  margin-top: 5%;
  margin-bottom: 2.5%;
  display: inline-block;
  border-radius: 2px;
  width: 75%;
}
</style>
