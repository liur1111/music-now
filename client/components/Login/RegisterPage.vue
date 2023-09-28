<!-- Page for account sign-in and registration -->
<!-- User should be NOT authenticated in order to see this page -->

<template>
  <main>
    <MusicNowHeader />
    <article class="forms-container">
      <RegisterForm />
      <section class="signup-section">
        <p>Already have an account?</p>
        <button @click="$router.push('/login')">Log In</button>
      </section>
    </article>
  </main>
</template>

<script>
import RegisterForm from '@/components/Login/RegisterForm.vue';
import MusicNowHeader from '@/components/common/MusicNowHeader.vue';

export default {
  name: 'RegisterPage',
  components: {
    RegisterForm,
    MusicNowHeader
  }
};
</script>

<style scoped>
.forms-container {
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 32%;
}

.signup-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid rgb(176, 176, 176);
  border-radius: 4px;
  padding: 1rem 4rem;
  padding-bottom: 2rem;
  margin-top: 8px;
  background-color: white;
}

button {
  font-size: 15px;
  padding: 4px;
  margin-top: 8px;
  height: 2em;
  width: 100%;
  border: solid 1px rgb(192, 192, 192);
  border-radius: 4px;
  background-color: rgb(255, 255, 255);
}

button:hover {
  border-color: #1aeeab;
  background-color: rgb(255, 255, 255);
  border-width: 2px;
  color: #00c385;
}

main {
}
</style>
