<!-- Form for creating Song Selection -->

<template>
  <div class="info">
    <div v-if="editable">
      <div class="songResult">
        <img class="image" :src="albumCover" />
        <h3 class="track">{{ shortenedTrack }}</h3>
        <h4 class="artist">{{ artist }}</h4>
        <button class="clear" @click="clearSong">Remove</button>
      </div>
    </div>

    <div v-else>
      <div v-if="simpleCover">
        <div class="image-wrapper">
          <img class="image" :src="albumCover" />
          <FavoriteComponent :trackId="trackId" />
        </div>
        <h3 class="track">{{ shortenedTrack }}</h3>
        <h4 class="artist">{{ artist }}</h4>
      </div>
      <button
        v-if="!simpleCover || simpleCover === null"
        @click="
          $emit('select', {
            songTitle: trackName,
            songArtist: artist,
            trackId: trackId,
            albumCover: albumCover
          })
        "
      >
        <img class="image" :src="albumCover" />
        <h3 class="track">{{ shortenedTrack }}</h3>
        <h4 class="artist">{{ artist }}</h4>
      </button>
    </div>
  </div>
</template>

<script>
import FavoriteComponent from '@/components/Favorites/FavoriteComponent.vue';

export default {
  name: 'SongComponent',
  components: {FavoriteComponent},
  props: {
    trackName: {
      type: String,
      required: false
    },
    artist: {
      type: String,
      required: false
    },
    trackId: {
      type: String,
      required: false
    },
    albumCover: {
      type: String,
      required: false
    },
    simpleCover: {
      type: Boolean,
      required: false
    },
    editable: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    shortenedTrack() {
      if (this.trackName.length > 25) {
        return this.trackName.substring(0, 21) + '...';
      } else return this.trackName;
    }
  },
  data() {
    return {
      alerts: {} // Displays success/error messages encountered during freet modification
    };
  },
  methods: {
    clearSong() {
      this.$emit('cleared');
    }
  }
};
</script>

<style scoped>
.info {
  /* justify-content: center; */
  text-align: center;
  width: 220px;
  height: 220px;
  margin: 20px 0;
  /* border: solid 3px rgb(24, 23, 23); */
  border-radius: 2px;
}

.clear {
  align-content: right;
  font-size: 10;
}
.track {
  font-size: 14;
  font-weight: bold;
  margin-bottom: -16px;
}
.image {
  height: 80%;
  width: 80%;
  margin-bottom: -15px;
  filter: drop-shadow(0 4px 0.25rem rgb(205, 205, 205));
}

.artist {
  font-size: 10;
  font-weight: lighter;
  margin-bottom: 7px;
}

.image-wrapper {
  position: relative;
}

button {
  font-size: 15px;
  padding: 5px;
  border-radius: 8px;
  background-color: rgb(255, 255, 255);
}
button:hover {
  background-color: #e4fff7;
  color: rgb(56, 108, 90);
  border-color: rgb(88, 229, 180);
  color: black;
}
</style>
