<template>
  <!-- <script src="https://unpkg.com/vue@2"></script> -->
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container1">
        <button class="modal-default-button" @click="$emit('close')">X</button>
        <div class="modal-body1">
          <div class="songSearch">
            <input
              @input="searchQuery = $event.target.value"
              @keyup.enter="submitSong"
              placeholder="Search for a song by title, artist, or album name..."
            />
            <button class="submit" @click="submitSong">Search</button>
          </div>
          <div v-if="selecting" class="songPicture">
            <SongComponent
              v-for="result in searchResults"
              @select="selected"
              :key="result.index"
              :trackName="result.trackName"
              :artist="result.artist"
              :trackId="result.trackId"
              :albumCover="result.albumCover"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SongComponent from '@/components/Song/SongComponent.vue';

export default {
  name: 'SongPopUp',
  components: {SongComponent},
  props: {},
  data() {
    return {
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
    async selected(songInfo) {
      this.trackName = songInfo.songTitle;
      this.artist = songInfo.songArtist;
      this.trackId = songInfo.trackId;
      this.albumCover = songInfo.albumCover;
      await this.createSong(songInfo);
      this.submitted = true;
      this.$emit('selected', {
        songTitle: this.trackName,
        songArtist: this.artist,
        trackId: songInfo.trackId,
        albumCover: this.albumCover
      });
    },
    formatSongs(result) {
      /**
       * puts search results into a usable format
       */
      this.searchResults = [];
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
      this.searchQuery = '';
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

<style>
input {
  font-size: 16px;
  height: 2em;
  border: rgb(63, 63, 63) solid 1px;
  padding: 0 8px;
  border-radius: 8px;
}
button {
  padding: 8px;
  margin: 8px;
  font-size: 16px;
  align-self: center;
  border: solid 1px #ccc;
  border-radius: 8px;
  /* background-color: rgb(255, 255, 255); */
  background-color: white;
}

.submit {
  padding: 8px;
  font-size: 15px;
  align-self: center;
  border: solid 1px #ccc;
  /* background-color: rgb(255, 255, 255); */
  background-color: rgb(214, 255, 241);
  border-radius: 2px;
}

.submit:hover {
  background-color: #004c33;
}

button:hover {
  /* background-color: rgb(54, 54, 54); */
  background-color: #e8fff7;
  color: white;
  border-color: #81ffd3;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container1 {
  height: 820px;
  width: 100px;
  margin: 100px 100px;
  padding: 20px 20px;
  /* background-color: #ccc; */
  background-color: aquamarine;
  border-radius: 18px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  font-family: Helvetica, Arial, sans-serif;
}

.modal-body1 {
  margin: 20px 0;
}
/* .modal-default-button {
  float: right;
}
.modal-default-button:hover {
  background-color: #dcfff3;
  border-color: #81ffd3;
} */
.songSearch {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.songPicture {
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 110px;
  column-gap: 20px;
  grid-auto-rows: 120px;
  grid-template-areas:
    ' a a '
    ' b b '
    ' c c ';
  align-self: center;
}
</style>
