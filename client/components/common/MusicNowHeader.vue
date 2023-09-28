<!-- eslint-disable vue/singleline-html-element-content-newline -->
<!-- Reusable component for displaying the Music Now header that shows today's date -->

<template>
  <header class="header-container">
    <h1 class="header-big-text">MusicNow</h1>
    <h2 class="header-small-text">
      {{ todayDate }}
    </h2>
  </header>
</template>

<script>
export default {
  name: 'MusicNowHeader',
  data() {
    return {};
  },
  computed: {
    todayDate() {
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      // Formatted as Month Day, Year (Nov 21, 2022 for example)
      return `${this.numberToMonth(month)} ${day}, ${year}`;
    }
  },
  methods: {
    numberToMonth(number) {
      return [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ][number];
    }
  }
};
</script>

<style scoped>
.header-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  padding-top: 40px;
  /* margin: 20px; */
  position: relative;
}
.header-big-text {
  font-size: 60px;
  font-weight: normal;
  margin: 15px 15px;
}
.header-small-text {
  font-size: 30px;
  font-weight: normal;
  margin: 5px 5px;
}
</style>
