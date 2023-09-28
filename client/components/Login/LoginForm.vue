<!-- Form for signing in (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'LoginForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/users/session',
      method: 'POST',
      hasBody: true,
      setUsername: true,
      resetMixtape: true,
      fields: [
        {id: 'username', label: 'Username', value: ''},
        {id: 'password', label: 'Password', value: ''}
      ],
      title: 'Log in',
      showTitle: false,
      callback: () => {
        this.$router.push({name: 'Home'});
        this.$store.commit('alert', {
          message: 'You are now signed in!',
          status: 'success'
        });
      }
    };
  }
};
</script>
