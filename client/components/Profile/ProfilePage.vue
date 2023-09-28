<!-- User should be authenticated in order to see this page -->

<template>
  <main class="not-modal">
    <section v-if="$store.state.profileUsername === $route.params.name">
      <header>
        <div class="left">
          <section class="user-info">
            <div class="circle">
              <p class="circle-inner">{{ profilePicText }}</p>
            </div>
            <div class="name-info">
              <h3>{{ $store.state.profileFullname }}</h3>
              <h3>@{{ $store.state.profileUsername }}</h3>
            </div>
            <button @click="open">
              {{ $store.state.profileFriends.length }} Friends
            </button>
          </section>
          <FriendPopUp
            v-if="this.$store.state.profilePopUp == true"
            @close="close"
            :friends="$store.state.profileFriends"
          />
        </div>
        <div class="right">
          <section class="memory-info">
            <h2>Memories</h2>
            <div class="rectangle">
              <div class="memory-rectangle">
                <MemoryComponent
                  v-for="mixtape in this.$store.state.profileMixtapes.slice(
                    0,
                    8
                  )"
                  :key="mixtape.id"
                  :mixtape="mixtape"
                />
              </div>
              <div
                class="show-more"
                v-if="this.$store.state.profileMixtapes.length > 8"
              >
                <router-link
                  style="text-decoration: none; color: black"
                  :to="{name: 'Memories'}"
                >
                  View All →
                </router-link>
              </div>
            </div>
          </section>
        </div>
      </header>
      <footer>
        <section class="user-info">
          <h2>Saved Songs</h2>
          <div class="rectangle">
            <div class="favorites-rectangle">
              <SongComponent
                v-for="favorite in this.favoriteSongsToDisplay"
                :key="favorite._id"
                class="profile-song"
                :trackName="favorite.song.songTitle"
                :artist="favorite.song.songArtist"
                :trackId="favorite.song.trackId"
                :albumCover="favorite.song.albumCover"
                :simpleCover="true"
              />
              <router-link
                v-if="this.$store.state.profileFavorites.length > 7"
                class="profile-song view-all-box"
                style="color: black"
                :to="{name: 'Favorites'}"
              >
                <p class="hover-view">View All →</p>
              </router-link>
            </div>
          </div>
        </section>
      </footer>
    </section>
    <i v-else class="fas fa-circle-notch fa-spin fa-2x loading" />
  </main>
</template>

<script>
import MemoryComponent from '@/components/Profile/MemoryComponent.vue';
import SongComponent from '@/components/Song/SongComponent.vue';
import FriendComponent from '@/components/FindFriends/FriendComponent.vue';
import FriendPopUp from '@/components/Profile/FriendPopUp.vue';

export default {
  name: 'ProfilePage',
  components: {FriendComponent, FriendPopUp, MemoryComponent, SongComponent},
  data() {
    return {
      isOpen: false
    };
  },
  computed: {
    profilePicColor() {
      return this.$store.state.profileCircleColor;
    },
    profilePicText() {
      return this.$store.state.profileCircle;
    },
    favoriteSongsToDisplay() {
      return this.$store.state.profileFavorites.length > 7
        ? this.$store.state.profileFavorites.slice(0, 6)
        : this.$store.state.profileFavorites.slice(0, 7);
    }
  },
  beforeMount() {
    if (this.$route.params.name) {
      this.$store.commit('refreshProfile', this.$route.params.name);
    }
  },
  methods: {
    open() {
      this.$store.commit('setProfilePopUp', true);
    },
    close() {
      this.$store.commit('setProfilePopUp', false);
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
  margin-top: 50px;
  border: solid 1px rgb(211, 211, 211);
  background-color: rgb(255, 255, 255);
  border-radius: 2px;
  width: 50%;
}

button:hover {
  /* background-color: rgb(54, 54, 54); */
  background-color: rgb(255, 255, 255);
  color: #00c385;
  border-color: #1aeeab;
  cursor: pointer;
}

.name-info {
  margin: 0px;
  display: flex;
  flex-direction: column;
  position: absolute;
  align-items: center;
  width: 100%;
  bottom: 50px;
}

.name-info h3 {
  margin: 4px;
}

.left {
  width: 30%;
}

.right {
  width: 70%;
  justify-content: flex-end;
}

.circle {
  display: inline-block;
  background-color: v-bind(profilePicColor);
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
  /* background-color: #ccc; */
  background-color: whitesmoke;
  /* background-color: #ccc; */
  border: #b1b1b1 solid;
  /* background-color: whitesmoke; */
  /* background-color: #7bebc8; */
  border-radius: 16px;
  /* background-color: #7bebc8; */
}

.memory-rectangle {
  margin: 2%;
  color: black;
  height: 50vh;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.favorites-rectangle {
  margin: 2%;
  color: black;
  height: 25vh;
  width: 96%;
  display: flex;
  gap: 2%;
}

.profile-song {
  width: 12.5%;
  /* width: 17.5%; */
}

.view-all-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border: solid 1px rgb(24, 23, 23);
  border-radius: 2px;
  text-decoration: none;
}

.view-all-box:hover {
  text-decoration: underline;
  cursor: pointer;
}

.user-info {
  text-align: center;
  position: relative;
}
.memory-info {
  text-align: center;
  width: 100%;
}
.show-more {
  margin-bottom: 0.05%;
  margin-right: 1%;
  float: right;
}

.show-more:hover {
  text-decoration: underline;
  cursor: pointer;
}

.loading {
  display: flex;
  justify-content: center;
  margin: 300px;
  color: rgba(0, 0, 0, 0.545);
}

.hover-view:hover {
  text-decoration: underline;
}
</style>
