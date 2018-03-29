<template>
  <div class="container">
    <h3><u>Question</u></h3>
    <div class="row">
      <div class="col-md-12" style="margin-bottom:20px;">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{titlequestion}}</h5>
            <p class="card-text">{{contentquestion}}</p>
            <div style="float:right">
              <button type="button" class="btn-outline-secondary" style="padding:1px 10px; border-radius:5px;" @click='votepertanyaan(1)'>
                UnLike <span class="badge badge-dark">{{questionunlike}}</span>
              </button>
              <button type="button" class="btn-outline-secondary" style="padding:1px 10px; border-radius:5px;" @click='votepertanyaan(0)'>
                like <span class="badge badge-dark">{{questionlike}}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="" style="padding-bottom:50px;">
        <h3 style="text-align:center">ANSWER</h3>
        <div class="row">
          <div class="col-md-12" style="margin-bottom:20px;" v-for="(n,i) in answer" :key="i">
            <div class="card">
              <div class="card-body">
                <p class="card-text" v-html="n.content">{{n.content}}</p>
                <div style="float:right">
                  <button type="button" class="btn-outline-secondary" style="padding:1px 10px; border-radius:5px;" @click="voteanswer(n.id,0)">
                    UnLike <span class="badge badge-dark">{{n.unlikeanswer}}</span>
                  </button>
                  <button type="button" class="btn-outline-secondary" style="padding:1px 10px; border-radius:5px; " @click="voteanswer(n.id,1)">
                    like <span class="badge badge-dark">{{n.likeanswer}}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <vue-editor v-model='contentanswer'></vue-editor>
            <button type="button" class="btn btn-primary" style="padding:1px 10px; border-radius:5px; float:right; margin-top:20px; margin-right:20px;" @click="addanswer"> send your answer</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import axios from 'axios'
export default {
  components: {
    VueEditor
  },
  data () {
    return {
      titlequestion: '',
      contentquestion: '',
      contentanswer: '',
      questionlike: 0,
      questionunlike: 0,
      answer: []
    }
  },
  created: function () {
    this.showquestion()
  },
  methods: {
    showquestion () {
      axios.get(`http://localhost:3000/showquestiondetail/${this.$route.params.id}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      }).then(response => {
        this.titlequestion = response.data.question.title
        this.contentquestion = response.data.question.content
        let like = 0
        let unlike = 0
        for (let i = 0; i < response.data.votequestion.length; i++) {
          if (response.data.votequestion[i].vote === 1) {
            like++
          } else {
            unlike++
          }
        }
        this.questionlike = like
        this.questionunlike = unlike
        let answer = []

        for (let i = 0; i < response.data.answer.length; i++) {
          let likeanswer = 0
          let unlikeanswer = 0
          let dataobj = {}
          for (let j = 0; j < response.data.voteanswer.length; j++) {
            if (response.data.voteanswer[j].idanswer === response.data.answer[i]._id) {
              if (response.data.voteanswer[j].vote === 1) {
                likeanswer++
              } else {
                unlikeanswer++
              }
            }
          }
          dataobj.id = response.data.answer[i]._id
          dataobj.content = response.data.answer[i].content
          dataobj.likeanswer = likeanswer
          dataobj.unlikeanswer = unlikeanswer
          answer.push(dataobj)
        }
        this.answer = answer
      })
    },
    votepertanyaan (vote) {
      axios.post('http://localhost:3000/addvotequestion/', {
        questionid: this.$route.params.id,
        vote: vote
      },
      {
        headers: {
          token: localStorage.getItem('token')
        }
      }).then(response => {
        console.log(response)
        this.showquestion()
      })
    },
    voteanswer (id, vote) {
      axios.post('http://localhost:3000/addvoteanswer/', {
        answerid: id,
        vote: vote
      },
      {
        headers: {
          token: localStorage.getItem('token')
        }
      }).then(response => {
        console.log(response)
        this.showquestion()
      })
    },
    addanswer () {
      axios.post('http://localhost:3000/addanswer/', {
        idquestion: this.$route.params.id,
        content: this.contentanswer
      },
      {
        headers: {
          token: localStorage.getItem('token')
        }
      }).then(response => {
        this.showquestion()
      })
    }
  }
}
</script>

<style scoped>
.container{
  padding-top: 20px;
}
</style>
