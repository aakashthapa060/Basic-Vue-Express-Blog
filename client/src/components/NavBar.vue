<script setup>
import { RouterLink, RouterView } from "vue-router";
import { userAuthCheck } from "../composables/userAuthenticated.js";
let user = userAuthCheck();
const api_path = "http://localhost:8000/api/users/logout";

const logout = async () => {
  try {
    const response = await fetch(api_path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    if (data.message) {
      user = null;
      console.log(data);
      console.log(user);
      location.assign("/login");
    }
  } catch (e) {
    // statements
    console.log(e);
  }
};

console.log(user);
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">Blogging App</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <RouterLink class="nav-link" :to="{ name: 'home' }"
            >Home <span class="sr-only">(current)</span></RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" :to="{ name: 'createblog' }"
            >Create Blog</RouterLink
          >
        </li>
      </ul>
      <span class="navbar-nav" v-if="user">
        <RouterLink class="nav-link" to="#"
          >Hello, {{ user.username }}</RouterLink
        >
        <p class="btn btn-danger" @click="logout">Logout</p>
      </span>
      <span class="navbar-nav" v-else>
        <RouterLink class="nav-link" :to="{ name: 'login' }"
          >Sign In</RouterLink
        >
        <RouterLink class="btn btn-primary" :to="{ name: 'signup' }"
          >Sign Up</RouterLink
        >
      </span>
    </div>
  </nav>

  <RouterView />
</template>
