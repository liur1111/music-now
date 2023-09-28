<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section class="user-info">
      <h2>
        <router-link
          style="text-decoration: none; color: black"
          :to="{name: 'Profile', params: {name: this.$store.state.profileUsername}}"
        >
          <i class="fas fa-arrow-left left-side"></i>
        </router-link>
        Saved Songs
      </h2>
      <div class="rectangle">
        <div class="favorites-rectangle">
          <SongComponent 
            class="favorites-page"
            v-for="favorite in this.$store.state.profileFavorites"
            :trackName="favorite.song.songTitle"
            :artist="favorite.song.songArtist"
            :trackId="favorite.song.trackId"
            :albumCover="favorite.song.albumCover"
            :simpleCover="true"
          />
        </div>
      </div>
    </section>
  </main>
</template>



<script>
import SongComponent from '@/components/Song/SongComponent.vue';

export default {
  name: 'ProfileSongsPage',
  components: {SongComponent},
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

.favorites-rectangle {
  margin: 2%;
  color: black;
  width: 96%;
  display: flex;
  flex-wrap: wrap;
  gap: 2%;
}

.user-info {
  text-align: center;
}

.memory-info {
  text-align: center;
  width: 100%;
}

.favorites-page {
  height: 100%;
  width: 18.4%;
  margin-bottom: 2%;
}

.left-side {
  float: left;
}
</style>
