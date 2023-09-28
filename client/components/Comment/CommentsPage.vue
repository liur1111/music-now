<!-- eslint-disable vue/max-attributes-per-line -->
<!-- Page for account settings and management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main class="viewport">
    <section>
      <header>
        <h2 v-if="$route.query.memory === undefined">
          <router-link
            style="text-decoration: none; color: black"
            :to="{name: 'Home'}"
          >
            <i class="fas fa-arrow-left left-side"></i>
          </router-link>
          Comments Section
        </h2>
        <h2 v-else>
          <router-link
            style="text-decoration: none; color: black"
            :to="{
              name: 'Profile',
              params: {name: this.$store.state.profileUsername}
            }"
          >
            <i class="fas fa-arrow-left left-side"></i>
          </router-link>
          Memory on {{ mixtape.date }}
        </h2>
      </header>
      <MixtapeComponent
        v-if="mixtape !== undefined"
        :mixtape="mixtape"
        :showComments="true"
      />
    </section>
    <section v-if="$store.state.username && $route.query.memory === undefined">
      <CreateCommentsForm :mixtape-id="$route.params.mixtapeId" />
    </section>
    <section v-if="$store.state.mixtapes.length">
      <CommentComponent
        v-for="comment in comments"
        :key="comment._id"
        :comment="comment"
      />
    </section>
  </main>
</template>

<script>
import MixtapeComponent from '@/components/Mixtape/MixtapeComponent.vue';
import CommentComponent from '@/components/Comment/CommentComponent.vue';
import CreateCommentsForm from '@/components/Comment/CreateCommentsForm.vue';

export default {
  name: 'CommentsPage',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    MixtapeComponent,
    CreateCommentsForm,
    CommentComponent
  },
  props: {},

  data() {
    return {};
  },
  computed: {
    mixtape() {
      // look for mixtapes in current feed and profile
      const allMixtapesSet = new Set();
      if (this.$store.state.mixtapes && this.$store.state.mixtapes.length > 0) {
        this.$store.state.mixtapes.forEach((mixtape) => {
          allMixtapesSet.add(mixtape);
        });
      }
      if (
        this.$store.state.profileMixtapes &&
        this.$store.state.profileMixtapes.length > 0
      ) {
        this.$store.state.profileMixtapes.forEach((mixtape) => {
          allMixtapesSet.add(mixtape);
        });
      }

      if (this.$store.state.personalMixtape) {
        allMixtapesSet.add(this.$store.state.personalMixtape);
      }

      const allMixtapes = [...allMixtapesSet];
      for (const mixtape of allMixtapes) {
        if (this.$route.params.mixtapeId === mixtape._id) {
          return mixtape;
        }
      }
      return undefined;
    },
    comments() {
      return this.$store.state.comments ?? [];
    }
  },
  created() {
    if (this.mixtape !== undefined) {
      this.$store.commit('setComments', this.$route.params.mixtapeId);
    }
  }
};
</script>

<style>
.viewport {
  margin: auto;
  width: 70%;
  text-align: center;
}

.left-side {
  float: left;
}
</style>
