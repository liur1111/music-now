<template>
   <div class="center">
      <h1 v-if="$store.state.prompt !== undefined"> {{ $store.state.prompt.promptText }} </h1>
   </div>
</template>

<script>
export default {
  name: 'PromptComponent',
};
</script>

<style scoped>
.center {
  font-size: 30px;
  font-weight: bold;
  margin-left: 50px;
  margin-right: 50px;
  display: flex;
  flex-direction: column;
  text-align: center;

}

</style>
