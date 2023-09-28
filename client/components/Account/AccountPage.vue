<!-- Page for account settings and management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main class="settings">
    <section>
      <header>
        <h2>Account settings for @{{ $store.state.username }}</h2>
      </header>
      <ChangeProfilePictureForm />
      <ChangePasswordForm />
    </section>
    <section>
      <header>
        <h2>Account management</h2>
      </header>
      <LogoutForm />
      <DeleteAccountForm />
    </section>
  </main>
</template>

<script>
import ChangePasswordForm from '@/components/Account/ChangePasswordForm.vue';
import ChangeProfilePictureForm from '@/components/Account/ChangeProfilePictureForm.vue';
import DeleteAccountForm from '@/components/Account/DeleteAccountForm.vue';
import LogoutForm from '@/components/Account/LogoutForm.vue';

export default {
  name: 'AccountPage',
  components: {
    ChangePasswordForm,
    ChangeProfilePictureForm,
    DeleteAccountForm,
    LogoutForm
  },
  mounted() {
    this.$store.commit('refreshProfile', this.$store.state.username);
  }
};
</script>

<style scoped>
.settings {
  background-color: #ffffff;
}

button {
  background-color: rgb(255, 255, 255);
  border: solid 2px rgb(211, 211, 211);
  border-radius: 8px;
  margin: 0 8px;
}

button:hover {
  border-color: #1aeeab;
  background-color: rgb(255, 255, 255);
  border-width: 2px;
  color: #00c385;
}

h2 {
  margin-block-start: 0;
  padding-top: 0.83em;
}
</style>
