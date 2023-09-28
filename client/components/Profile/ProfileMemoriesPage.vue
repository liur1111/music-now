<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section class="memory-info">
      <h2>
        <router-link
          style="text-decoration: none; color: black"
          :to="{name: 'Profile', params: {name: this.$store.state.profileUsername}}"
        >
          <i class="fas fa-arrow-left left-side"></i>
        </router-link>
        Memories
      </h2>
      <div class="rectangle">
        <div class="memory-rectangle">
          <MemoryComponent 
            class="memory-page"
            v-for="mixtape in this.$store.state.profileMixtapes"
            :key="mixtape"
            :mixtape="mixtape"
          />
        </div>
      </div>
    </section>
  </main>
</template>



<script>
import MemoryComponent from '@/components/Profile/MemoryComponent.vue';

export default {
  name: 'ProfileMemoriesPage',
  components: {MemoryComponent},
  data() {
    return {
    };
  },
  beforeMount() {
  },
  methods: {
  }
}

</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 0;
}

header, header > * {
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

.info{
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

.memory-rectangle {
  margin: 2%;
  color: black;
  /* height: 50vh; */
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.user-info {
  text-align: center;
}

.memory-info {
  text-align: center;
  width: 100%;
}

.memory-page {
  height: 24vh;
  width: 24vh;
}

.left-side {
  float: left;
}
</style>
