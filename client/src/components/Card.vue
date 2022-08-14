<script setup>
const props = defineProps(["username", "title", "content"]);
</script>

<template>
  <div class="card">
    <div class="card-header">{{ username }}</div>
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">
        {{ content }}
      </p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
</template>

<style scoped>
.card {
  margin-bottom: 20px;
}
</style>
