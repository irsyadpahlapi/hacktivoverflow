<template>
  <div class="content">
    <div class="col-md-4 offset-md-4" style="border:1px solid rgba(0,0,0,0.125); margin-top:20px; border-radius:5px; padding:20px;">
        <div class="form-group">
          <label for="exampleInputEmail1" >Email address</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text">@</div>
            </div>
            <input type="email" class="form-control" id="exampleInputEmail1" v-model="email" aria-describedby="emailHelp" placeholder="Enter email">
          </div>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <div class="input-group-text">P</div>
            </div>
            <input type="password" class="form-control" id="exampleInputPassword1" v-model="password" placeholder="Password">
          </div>
        </div>
        <button type="submit" class="btn btn-outline-dark" @click="login">Submit</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Login Hacktiv Overflow',
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      axios.post('http://localhost:3000/signin', {
        email: this.email,
        password: this.password
      }).then(response => {
        localStorage.setItem('token', response.data.token)
        location.href = '/'
      })
    }
  }
}
</script>

<style scoped>
</style>
