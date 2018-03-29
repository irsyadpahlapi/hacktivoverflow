<template>
  <div class="">
    <nav class="navbar navbar-expand-lg navbar-light bg-dark  justify-content-end">
      <div class="row">
        <div class="col-md-2 col-xs-12">
          <button type="button" v-show="!token" class="btn btn-light" data-toggle="modal" data-target="#exampleModal">Register</button>
          <button type="button" v-show="token" class="btn btn-light" @click="logout">Logout</button>
        </div>
      </div>
    </nav>
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="inputname">Full Name</label>
              <input type="text" class="form-control" id="inputname" v-model="fullname" placeholder="Enter Full Name">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" class="form-control" id="exampleInputEmail1" v-model="email" aria-describedby="emailHelp" placeholder="Enter email">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" v-model="password" placeholder="Password">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="register">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'navbar',
  data () {
    return {
      msg: 'ini navbar',
      fullname: '',
      email: '',
      password: '',
      token: localStorage.getItem('token') || null
    }
  },
  methods: {
    register () {
      axios.post('http://localhost:3000/register', {
        name: this.fullname,
        email: this.email,
        password: this.password
      }).then(data => {
        console.log(data)
      })
    },
    logout () {
      localStorage.clear()
      location.reload()
    }
  }
}
</script>

<style>
label,::-webkit-input-placeholder {
  font-size:12px;
  color:rgba(0,0,0,0.5)
}
</style>
