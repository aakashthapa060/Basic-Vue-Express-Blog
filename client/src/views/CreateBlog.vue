<script setup>
import { reactive } from "vue";
import { storeToRefs } from 'pinia';
import {userAuth} from '../stores/userAuth';
const user = userAuth();
user.getUser();
const user_data = storeToRefs(user);
console.log(user_data.user)
const userInput = reactive({
  username: "",
  title: "",
  content: "",
});
const api_path = "http://localhost:8000/api/blogs/create-blog";

const createBlog = async () => {
  try {
    const response = await fetch(api_path, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userInput.username,
        title: userInput.title,
        content: userInput.content,
      }),
    });
    const data = await response.json();
  } catch (e) {
    // statements
    console.log(e);
  }
};
</script>

<template>
  <div class="container">
    {{ user }}
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control title"
          id="title"
          v-model="userInput.title"
          placeholder="Title"
        />
      </div>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">Content</span>
        </div>
        <textarea
          class="form-control"
          v-model="userInput.content"
          aria-label="Content"
        ></textarea>
      </div>
      <br />
      <button class="btn btn-primary" @click.prevent="createBlog">
        Create Post
      </button>
    </form>
  </div>
</template>
