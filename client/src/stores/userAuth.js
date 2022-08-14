import { defineStore } from 'pinia'
const api_path = "http://localhost:8000/api/users";

export const userAuth = defineStore("userAuth", {
	state: () => {
		user: {}
	},
	action: {
		async getUser(){
			try {
		      const response = await fetch(api_path, {
		        headers: {
		          "Content-Type": "application/json",
		        },
		        credentials: "include",
		      });

		      const content = await response.json();

		      this.user = content;
		    } catch (e) {
		      // statements
		      console.log(e);
		    }
		}
	}
})