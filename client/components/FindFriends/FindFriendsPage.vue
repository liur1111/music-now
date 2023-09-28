<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <div class="toggle">
      <center>
        <button class="inactive" v-if="!searchPage" @click="searchPageToggle">
          Search for Friends
        </button>
        <button class="active" v-if="searchPage" @click="searchPageToggle">
          Search for Friends
        </button>

        <button class="inactive" v-if="!yourFriends" @click="yourFriendsToggle">
          Your Friends
        </button>
        <button class="active" v-if="yourFriends" @click="yourFriendsToggle">
          Your Friends
        </button>

        <button
          class="inactive"
          v-if="!requestsPage"
          @click="requestsPageToggle"
        >
          Friend Requests
        </button>
        <button class="active" v-if="requestsPage" @click="requestsPageToggle">
          Friend Requests
        </button>
      </center>
    </div>
    <div v-if="searchPage === true">
      <header>Find Friends</header>
      <div></div>
      <center class="search">
        <textarea
          class="searchbar"
          rows="1"
          @input="usernameQuery = $event.target.value"
          placeholder="Start typing to search for users..."
          style="resize: none"
        />
      </center>
      <div class="friends" v-if="usersToShow.length > 0">
        <FriendComponent
          v-for="user in usersToShow"
          :key="user"
          :friend="user"
          :confirmed="false"
        />
      </div>
      <div v-else>
        <div class="friends" v-if="usernameQuery === ''">
          <h2>
            There are currently no other users to add as friends, check back
            later!
          </h2>
        </div>
        <div class="friends" v-if="usernameQuery !== ''">
          <h2>There are no users by that username!</h2>
        </div>
      </div>
    </div>
    <div v-if="yourFriends === true">
      <header>Your Friends</header>
      <center class="search">
        <textarea
          class="searchbar"
          rows="1"
          @input="friendQuery = $event.target.value"
          placeholder="Start typing to search through your friends..."
          style="resize: none"
        />
      </center>
      <div class="friends" v-if="friendsToShow.length > 0">
        <FriendComponent
          v-for="user in friendsToShow"
          :key="user"
          :friend="user"
          :confirmed="true"
        />
      </div>
      <div v-else>
        <div class="friends" v-if="friendQuery === ''">
          >
          <h2>
            You currently haven't added any friends, send a friend request to
            get started!
          </h2>
        </div>
        <div class="friends" v-if="friendQuery !== ''">
          <h2>You have no friends by that username!</h2>
        </div>
      </div>
    </div>
    <div v-if="requestsPage === true">
      <header>Friend Requests</header>
      <div class="friends" v-if="$store.state.friendRequests.length > 0">
        <FriendComponent
          v-for="user in $store.state.friendRequests"
          :key="user"
          :friend="user"
          :confirmed="false"
        />
      </div>
      <div class="friends" v-if="$store.state.friendRequests.length === 0">
        <h2>You currently have no friend requests, check back later!</h2>
      </div>
    </div>
  </main>
</template>

<script>
import GetFriendsForm from '@/components/FindFriends/GetFriendsForm.vue';
import FriendComponent from '@/components/FindFriends/FriendComponent.vue';

export default {
  name: 'FindFriendsPage',
  components: {GetFriendsForm, FriendComponent},
  data() {
    return {
      usernameQuery: '',
      friendQuery: '',
      alerts: {},
      searchPage: true,
      yourFriends: false,
      requestsPage: false,
      searchResult: undefined
    };
  },
  computed: {
    usersToShow() {
      if (this.usernameQuery === '') {
        return this.$store.state.nonFriends.splice(0, 5);
      } else {
        const noCaps = this.usernameQuery.toLowerCase()
        const usernamesNoCaps = this.$store.state.nonFriends.map((username) => [username,username.toLowerCase()])
        const filtered = usernamesNoCaps.filter((usernames) =>
          usernames[1].includes(noCaps)
        );
        return filtered.map((usernames) => usernames[0]);
      }
    },
    friendsToShow() {
      if (this.friendQuery === '') {
        return this.$store.state.friends;
      } else {
        const noCaps = this.friendQuery.toLowerCase()
        const usernamesNoCaps = this.$store.state.friends.map((username) => [username,username.toLowerCase()])
        const filtered = usernamesNoCaps.filter((usernames) =>
          usernames[1].includes(noCaps)
        );
        return filtered.map((usernames) => usernames[0]);
      }
    }
  },
  beforeMount() {
    this.$store.commit('refreshFriends');
    this.$store.commit('refreshFriendRequests');
    this.$store.commit('refreshPossibleFriends');
  },
  methods: {
    filterUsers() {
      if (this.usernameQuery.length === 0) {
        this.searchResult = undefined;
      } else {
        if (this.$store.state.nonFriends.includes(this.usernameQuery)) {
          this.searchResult = [this.usernameQuery];
        } else {
          this.searchResult = [];
        }
      }
    },
    searchPageToggle() {
      this.searchPage = true;
      this.yourFriends = false;
      this.requestsPage = false;
    },
    yourFriendsToggle() {
      this.searchPage = false;
      this.yourFriends = true;
      this.requestsPage = false;
      this.$store.commit('refreshFriends');
    },
    requestsPageToggle() {
      this.searchPage = false;
      this.yourFriends = false;
      this.requestsPage = true;
      this.$store.commit('refreshFriendRequests');
    }
  }
};
</script>

<style scoped>
header {
  /* margin: auto; */
  text-align: center;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  margin-bottom: 30px;
  font-size: 50px;
}

textarea {
  border: 1px solid black;
  border-radius: 24px;
}
.search {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 2rem;
}

.friends {
  display: block;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  width: 50%;
}
.searchbar {
  /* text-align: center; */
  font-size: 20px;
  padding: 15px;
  /* align-content: center; */
  /* margin-top: 10px; */
  /* border: solid 4px rgb(192, 192, 192); */
  width: 50%;
  position: relative;
}

.toggle {
  /* margin-top: 30px; */
  padding-top: 30px;
  margin-bottom: 30px;
}
/* button {
  position: relative;
  padding: 15px;
  font-size: 20px;
  margin-left: 2px;
  background-color: rgb(230, 230, 230);
}

button:hover {
  background-color: #009965;
  color: white;
  border-color: rgb(54, 54, 54);
} */

button {
  background-color: rgb(255, 255, 255);
  border: solid 1px rgb(183, 183, 183);
  border-radius: 8px;
  margin: 0 8px;
}

button:hover {
  border-color: #1aeeab;
  border-width: 3px;
  color: #00c385;
}

.active {
  border-color: #1aeeab;
  border-width: 3px;
}

/* button:hover {
  background-color: rgb(84, 84, 84);
  color: white;
  border-color: rgb(54, 54, 54);
}


.active {
  background-color: rgb(28, 28, 28);
  color: white;
  border-color: rgb(54, 54, 54);
} */
</style>
