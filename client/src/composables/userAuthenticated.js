import { ref, onMounted } from "vue";

export function userAuthCheck() {
  const api_path = "http://localhost:8000/api/users";
  const user = ref("");
  onMounted(async () => {
    try {
      const response = await fetch(api_path, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const content = await response.json();

      user.value = content;
    } catch (e) {
      // statements
      console.log(e);
    }
  });
  return user;
}
