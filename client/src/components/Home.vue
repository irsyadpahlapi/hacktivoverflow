<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <div class="sidebar col-md-12">
          <ul class="list-group">
            <li class="list-group-item" data-toggle="modal" data-target="#addquestion">Add question</li>
            <li class="list-group-item">Proble Solved</li>
            <li class="list-group-item">Error</li>
            <li class="list-group-item">Hot news</li>
          </ul>
        </div>
      </div>
      <div class="col-md-9">
        <div class="content col-md-12">
          <div class="card bg-light col-md-12" style="padding:0px; margin-bottom:20px;" v-for="(n,i) in listquestion" :key="i">
            <div class="card-header" >
              <div class="" style="float:left;">
                {{n.title}}
              </div>
              <div class="" style="float:right;">
                <button type="button" class="btn-outline-secondary disabled" style="padding:1px 10px; border-radius:25px;">
                  vote <span class="badge badge-dark">{{n.vote}}</span>
                </button>
              </div>
            </div>
            <div class="card-body">
              <p class="card-text">{{n.content}}</p>
              <router-link :to="{name:'DetailQuestion',params:{id:n.id}}">
                <button type="button" class="btn btn-outline-dark">Detail >></button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="addquestion" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
              <label for="title">title</label>
              <input type="text" class="form-control" id="title" v-model="titlequestion" placeholder="Enter Full Name">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Your Question</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" v-model="contentquestion" placeholder="Enter Your Question"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="addquestion">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js PWA',
      titlequestion: '',
      contentquestion: '',
      listquestion: []
    }
  },
  created: function () {
    this.showquestion()
  },
  methods: {
    showquestion () {
      axios.get('http://localhost:3000/showquestion/').then(response => {
        console.log(response)
        let data = []
        for (let i = 0; i < response.data.question.length; i++) {
          let total = 0
          for (let j = 0; j < response.data.votequestion.length; j++) {
            if (response.data.question[i]._id === response.data.votequestion[j].idquestion._id) {
              total++
            }
          }
          let pertanyaan = {
            id: response.data.question[i]._id,
            title: response.data.question[i].title,
            content: response.data.question[i].content,
            vote: total
          }
          data.push(pertanyaan)
        }
        this.listquestion = data
      })
    },
    addquestion () {
      axios.post('http://localhost:3000/addquestion/',
        {
          title: this.titlequestion,
          content: this.contentquestion
        },
        {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(response => {
          console.log(response)
        })
    }
  }
}
</script>

<style scoped>
  .sidebar,.content{
    margin: 10px;
  }

  .list-group-item:hover{
    background-color: #343a40;
    color: white;
    cursor:pointer;
  }
</style>
