<!-- eslint-disable vue/max-attributes-per-line -->
<!-- Page for account settings and management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <article>
    <section v-if="profileCircleText !== null" class="comment-container">
      <div class="circle-profile">
        <p class="circle-profile-inner">{{ this.profileCircleText }}</p>
      </div>
      <div>
        <h4 class="comment-user" v-if="this.$store.state.friends.includes(comment.author) || comment.author === $store.state.username">
          <router-link
            style="text-decoration: none; color: black"
            :to="{name: 'Profile', params: {name: comment.author}}"
          >
            <span v-on:click="goToProfile"> @{{ comment.author }} </span>
          </router-link>
        </h4>
        <h4 class="comment-user" v-else> @{{ comment.author }}</h4>
        <p class="comment-content"> &nbsp;&nbsp;{{ comment.content }}</p>
      </div>
    </section>
    <section v-else class="comment-container">
      <i class="fas fa-circle-notch fa-spin fa-2x loading" />
    </section>
  </article>
</template>

<script>
export default {
  name: 'CommentComponent',
  props: {comment: {type: Object, required: true}},
  data() {
    return {
      profileCircleColor: null,
      profileCircleText: null,
    };
  },
  computed: {},
  async beforeMount() {
    const url = `/api/profile?username=${this.comment.author}`;
    const res = await fetch(url).then(async (r) => r.json());
    if (res.iconText === undefined) {
      this.profileCircleText = res.fullName ? res.fullName[0] : this.comment.author[0];
    } else {
      this.profileCircleText = res.iconText;
    }
    if (res.iconColor === undefined) {
      this.profileCircleColor = '#ccc';
    } else {
      this.profileCircleColor = res.iconColor;
    }
  },
  methods: {
    goToProfile() {
      this.$store.commit('refreshProfile', this.comment.author);
      this.$store.commit('setProfilePopUp', false);
    },
  }
};
</script>
<style>
.comment-container {
  border-style: solid;
  border-color: rgb(153, 153, 153);
  border-width: 1px;
  border-radius: 8px;
  padding: 0 8px;
  margin-top: 8px;
  display: flex;
}
.comment-user {
  margin-bottom: 0;
  display: flex;
}

.comment-content {
  display: flex;
}

.circle-profile {
  background-color: v-bind(profileCircleColor);
  margin-top: 10px;
  margin-right: 10px;
  margin-left: 10px;
  border-radius: 50%;
  width: 90px;
  height: 90px;
  float: left;
}

.circle-profile-inner {
  color: black;
  display: table-cell;
  align-content: center;
  vertical-align: middle;
  text-align: center;
  text-decoration: none;
  height: 90px;
  width: 90px;
  font-size: 36px;
}

.loading {
  margin: auto
}
</style>
