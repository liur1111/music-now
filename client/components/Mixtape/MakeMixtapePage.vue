<template>
  <main class='forms-container'>
    <MusicNowHeader />
    <CreateMixtapeForm />
  </main>
</template>

<script>
import CreateMixtapeForm from '@/components/Mixtape/CreateMixtapeForm.vue';
import MusicNowHeader from '@/components/common/MusicNowHeader.vue';

export default {
  name: 'MakeMixtapePage',
  components: {CreateMixtapeForm, MusicNowHeader},
  methods: {
    submitMixtape() {
        this.$store.commit('postMixtape'); 
    }
  },
  created() {
    this.$store.commit('refreshPrompt');
  }
};
</script>

<style scoped>

.forms-container {
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}


</style>