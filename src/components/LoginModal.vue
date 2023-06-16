<template>
  <div class="login-modal">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>
    
  <script>
export default {
  name: "LoginModal",
  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async login() {
      try {
        let res = await fetch('https://frozen-lake-57865.herokuapp.com/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: this.username, password: this.password })
        })
        res = await res.json()
        this.username = res.username;
        alert('Vous êtes connectés en tant que ' + this.username + ' !');
        this.error = "";
        localStorage.setItem('user', JSON.stringify(res));
      } catch (error) {
        this.error = "Invalid username or password.";
        alert('Utilisateur inconnu !')
        console.error(error);
      }
    },
  },
};
</script>
    
  <style scoped>
.login-modal {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-modal h2 {
  text-align: center;
}

.login-modal form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.login-modal label {
  font-weight: bold;
}

.login-modal input {
  padding: 8px;
}

.login-modal button {
  padding: 8px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

.error-message {
  color: red;
  text-align: center;
}
</style>
  
