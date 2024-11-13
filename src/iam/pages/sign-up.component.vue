<script>
import {useAuthenticationStore} from "../services/authentication.store.js";
import {SignUpRequest} from "../model/sign-up.request.js";

export default {
  name: "sign-up",
  data() {
    return {
      authenticationStore: useAuthenticationStore(),
      username: "",
      password: "",
    };
  },
  methods: {
    onSignUp() {
      let signUpRequest = new SignUpRequest(this.username, this.password);
      this.authenticationStore.signUp(signUpRequest, this.$router);
    }
  }
}
</script>

<template>
  <div>
    <h3>Sign Up</h3>
  </div>
  <p class="p-fluid mb-5">Please enter the required information to sign up.</p>
  <div>
    <form @submit.prevent="onSignUp">
      <div class="p-fluid">
        <div class="field mt-5">
          <pv-float-label>
            <label for="username">Username</label>
            <pv-input-text id="username" v-model="username" :class="{'p-invalid': !username }"/>
            <small v-if="!username" class="p-invalid">Username is required.</small>
          </pv-float-label>
        </div>
        <div class="field mt-5">
          <pv-float-label>
            <label for="password">Password</label>
            <pv-input-text id="password" v-model="password" :class="{'p-invalid': !password }" type="password"/>
            <small v-if="!password" class="p-invalid">Password is required.</small>
          </pv-float-label>
        </div>
        <div class="p-field mt-5">
          <pv-button type="submit">Sign Up</pv-button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>