<!-- Form for creating Song Selection -->

<template>
  <div>
    <section v-if="!submitted">
      <div v-if="!editing">
        <button class="plus" v-if="!editing" @click="startEditing">+</button>
      </div>
      <div v-if="editing" class="song">
        <SongPopUp @close="close" @selected="selected" />
      </div>
    </section>
    <section class="submitted" v-if="submitted">
      <SongComponent
        @cleared="close"
        :trackName="trackName"
        :artist="artist"
        :trackId="trackId"
        :albumCover="albumCover"
        :editable="true"
      />
      <!-- :simpleCover="true" -->
    </section>
  </div>
</template>

<script>
import SongComponent from '@/components/Song/SongComponent.vue';
import SongPopUp from '@/components/Song/SongPopUp.vue';

export default {
  name: 'SelectSongForm',
  components: {SongComponent, SongPopUp},
  props: {
    prompt: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      editing: false, // Whether or not this song is in edit mode
      selecting: false,
      artist: '',
      trackName: '',
      trackId: '',
      albumCover: '',
      searchQuery: '',
      searchResults: [],
      submitted: false,
      alerts: {} // Displays success/error messages encountered during freet modification
    };
  },
  methods: {
    close() {
      this.editing = false;
      this.submitted = false;
    },
    startEditing() {
      /**
       * Enables edit mode on this song.
       */
      this.editing = true;
    },
    async selected(songInfo) {
      this.trackName = songInfo.songTitle;
      this.artist = songInfo.songArtist;
      this.trackId = songInfo.trackId;
      this.albumCover = songInfo.albumCover;
      await this.createSong(songInfo);
      this.submitted = true;
      this.editing = false;
      this.$emit('submit', {
        songTitle: this.trackName,
        songArtist: this.artist,
        trackId: songInfo.trackId
      });
    },
    formatSongs(result) {
      /**
       * puts search results into a usable format
       */
      for (const s of result) {
        const trackId = '' + s.id;
        const artist = s.artists[0].name;
        const trackName = s.name;
        const albumCover = s.album.images[1].url;
        this.searchResults.push({
          artist: artist,
          trackName: trackName,
          albumCover: albumCover,
          trackId: trackId
        });
      }

      return;
    },
    async createSong(songDetails) {
      /**
       * Create song object in db
       */
      const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(songDetails)
      };

      try {
        const r = await fetch('api/song', options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },
    submitSong() {
      /**
       * Finds song for mixtape
       * - first get the song objects, then ping the mixtape endpoint
       */
      const url = `api/song/search?q=${this.searchQuery}&type=track`;
      const params = {
        url: url,
        method: 'GET',
        message: 'Successfully found search results!',
        callback: () => {
          this.$set(this.alerts, params.message, 'success');
          setTimeout(() => this.$delete(this.alerts, params.message), 3000);
        }
      };
      this.request(params);
    },
    async request(params) {
      /**
       * Submits a request to the song's endpoint
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

        const returned = await r.json();
        this.formatSongs(returned.tracks.items);
        this.editing = false;
        this.selecting = true;

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
.plus {
  font-size: 30px;
  padding: 70px;
  margin: 10px;
  border: solid 2px rgb(192, 192, 192);
  border-radius: 8px;
  width: 100%;
}

.song {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.submitted {
  text-align: center;
  margin: 10px;
  /* padding: 40px; */
  /* border: solid 4px rgb(192, 192, 192); */
  /* border-radius: 2px; */
}

button {
  background-color: rgb(255, 255, 255);
}

button:hover {
  /* background-color: rgb(84, 84, 84); */
  background-color: #e4fff7;
  color: rgb(56, 108, 90);
  border-color: rgb(88, 229, 180);
}
</style>
