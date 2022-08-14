<script setup>
import { ref, onMounted } from "vue";
// import { userAuthCheck } from "../composables/userAuthenticated.js";
// const user = userAuthCheck();

import Card from "../components/Card.vue";
let blogs = ref("");

const api_path = "http://localhost:8000/api/blogs";
onMounted(async () => {
  try {
    const response = await fetch(api_path);
    const data = await response.json();
    blogs.value = data;
  } catch (e) {
    console.log(e);
  }
});
</script>

<template>
  <div class="container">
    <Card
      v-for="({ user, title, content }, key) in blogs.blogs"
      :username="user"
      :title="title"
      :content="content"
      :key="key"
    />
  </div>
</template>
