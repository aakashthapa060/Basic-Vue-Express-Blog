<script setup>
import { userAuthCheck } from "../composables/userAuthenticated.js";
let user = userAuthCheck();
import { reactive } from "vue";
const api_path = "http://localhost:8000/api/users/login";
const userInput = reactive({
  email: "",
  password: "",
});
const errors = reactive({
  error: false,
  msg: "",
});
const login_user = async () => {
  try {
    const response = await fetch(api_path, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: userInput.email,
        password: userInput.password,
      }),
    });
    const data = await response.json();
    if (!data.errors) {
      location.assign("/");
    } else if (data.errors) {
      errors.error = true;
      if (data.errors.username) errors.msg = data.errors.username;

      if (data.errors.email) errors.msg = data.errors.email;

      if (data.errors.password) errors.msg = data.errors.password;
    }
  } catch (e) {
    // statements
    console.log(e);
  }
};
</script>

<template>
  <div class="container">
    <div v-if="errors.error" class="alert alert-danger" role="alert">
      {{ errors.msg }}
    </div>
    <form>
      <div class="form-group">
        <label for="email">Email address</label>
        <input
          type="email"
          class="form-control"
          id="email"
          name="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          v-model="userInput.email"
        />
        <small id="emailHelp" class="form-text text-muted"
          >We'll never share your email with anyone else.</small
        >
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          name="password"
          placeholder="Password"
          v-model="userInput.password"
        />
      </div>
      <button type="submit" @click.prevent="login_user" class="btn btn-primary">
        Create Account
      </button>
    </form>
  </div>
</template>
