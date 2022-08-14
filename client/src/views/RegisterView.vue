<script setup>
import { reactive } from "vue";
const user_data = reactive({
  username: "",
  email: "",
  password: "",
});

const errors = reactive({
  error: false,
  msg: "",
});

const api_path = "http://localhost:8000/api/users";
const createUser = async () => {
  try {
    const response = await fetch(api_path, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
      body: JSON.stringify({
        username: user_data.username,
        email: user_data.email,
        password: user_data.password,
      }),
    });
    const data = await response.json();

    if (!data.errors) {
      location.assign("/");
      // console.log(data.token)
    } else if (data.errors) {
      errors.error = true;
      if (data.errors.username) errors.msg = data.errors.username;

      if (data.errors.email) errors.msg = data.errors.email;

      if (data.errors.password) errors.msg = data.errors.password;
    }
  } catch (e) {
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
        <label for="username">Username</label>
        <input
          type="text"
          class="form-control"
          id="username"
          name="username"
          v-model="user_data.username"
          placeholder="Username"
        />
      </div>
      <div class="form-group">
        <label for="email">Email address</label>
        <input
          type="email"
          class="form-control"
          id="email"
          name="email"
          aria-describedby="emailHelp"
          v-model="user_data.email"
          placeholder="Enter email"
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
          v-model="user_data.password"
          placeholder="Password"
        />
      </div>
      <button type="submit" @click.prevent="createUser" class="btn btn-primary">
        Create Account
      </button>
    </form>
  </div>
</template>

<style>
.container {
  margin-top: 50px;
}
</style>
