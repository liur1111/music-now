<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container1">
        <button class="modal-default-button" @click="$emit('close')">X</button>
        <div class="modal-body1">
          <FriendComponent
            v-for="friend in friends"
            class="friend"
            :key="friend"
            :friend="friend"
            :confirmed="$store.state.friends.includes(friend)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FriendComponent from '@/components/FindFriends/FriendComponent.vue';

export default {
  name: 'FriendPopUp',
  components: {FriendComponent},
  props: {
    friends: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      list: this.friends
    };
  },
  methods: {}
};
</script>

<style>
button {
  padding: 10px;
  font-size: 20px;
  align-self: center;
  border: solid 1px #ccc;
  background-color: #ccc;
  border-radius: 2px;
}

button:hover {
  background-color: rgb(54, 54, 54);
  color: white;
  border-color: rgb(54, 54, 54);
  cursor: pointer;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container1 {
  width: 700px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: white;
  border-radius: 18px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  font-family: Helvetica, Arial, sans-serif;
  max-height: 600px;
  overflow-y: auto;
}
.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}
.modal-body1 {
  width: 85%;
  margin-left: auto;
  margin-right: auto;
}
.modal-default-button {
  float: right;
  border: solid 1px white;
  background-color: white;
}
</style>
