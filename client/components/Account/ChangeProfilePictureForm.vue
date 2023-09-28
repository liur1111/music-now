<!-- Form for creating Song Selection -->

<template>
  <form>
    <header>
      <h3>Change Profile Icon</h3>
    </header>

    <div class="colorSelect">
      <div class="current">
        <p>Current Profile Icon</p>
        <div class="circle">
          <p class="circle-inner">{{ $store.state.profileCircle }}</p>
        </div>
      </div>

      <div class='changes'>
      <div class="selector">
        <label for="colorpicker">Select New Color:</label>
        <input
          class="colorpicker"
          type="color"
          id="colorpicker"
          @input="selectedNewColor = $event.target.value"
        />
      </div>

      <div class="selector-letter">
        <label for="letterpicker"> Select New Icon Content:</label>
        <input
          type="text"
          id="letterpicker"
          @input="selectedNewString = $event.target.value"
          placeholder="2 character or 1 emoji limit"
          maxlength="2"
        />
      </div>
      </div>
      <div class="new">
        <p>New Profile Icon</p>
        <div class="new-circle">
          <p class="circle-inner">{{ selectedNewString }}</p>
        </div>
      </div>
    </div>
    <button @click="changeProfileIcon">Save Changes</button>
  </form>
</template>

<script>
export default {
  name: 'ChangeProfilePictureForm',
  components: {},
  props: {},
  computed: {
    profilePicColor() {
      return this.$store.state.profileCircleColor;
    }
  },
  data() {
    return {
      selectedNewColor: '#ccc',
      selectedNewString: this.$store.state.username.substring(0,1),
      alerts: {} // Displays success/error messages encountered during freet modification
    };
  },
  methods: {
    changeProfileIcon() {
      this.$store.commit('refreshProfileIcon', {
        profileColor: this.selectedNewColor,
        profileText: this.selectedNewString
      });
    }
  }
};
</script>

<style scoped>
.colorSelect {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.selector,
.selector-letter {
  display: flex;
  margin-left: 50px;
  flex-direction: column;
  justify-content: center;
}

.colorpicker {
  height: 50px;
  width: 50px;
  margin-bottom: 20px;
}
.circle {
  display: inline-block;
  background-color: v-bind(profilePicColor);
  margin: 10px;
  margin-bottom: 30px;
  border-radius: 50%;
}

.changes {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 85px;
  margin-left: 45px
}

label {
  margin-bottom: 5px;
}

.new-circle {
  display: inline-block;
  background-color: v-bind(selectedNewColor);
  margin: 10px;
  margin-bottom: 30px;
  border-radius: 50%;
}

.circle-inner {
  color: black;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  text-decoration: none;
  height: 100px;
  width: 100px;
  font-size: 50px;
}

button {
  background-color: rgb(255, 255, 255);
  border: solid 2px rgb(215, 215, 215);
  border-radius: 8px;
  margin: 0 8px;
}

button:hover {
  background-color: white;
  border-color: #1aeeab;
  border-width: 2px;
  color: #00c385;
}

form {
  border: 1px solid rgb(176, 176, 176);
  border-radius: 4px;
  padding: 2rem 4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 14px;
  position: relative;
  background-color: white;
}
</style>
