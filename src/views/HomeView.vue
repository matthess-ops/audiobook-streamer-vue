<template>
  <div class="books">
    <div class="container">
      <div class="row">
        <div class="col-sm">One of three columns</div>
        <div class="col-sm">One of three columns</div>
        <div class="col-sm">One of three columns</div>
      </div>
    </div>
    <h1>book library</h1>
    <div v-if="loading">Data is loading...</div>
    <div v-else>
        <div class="row">
          <div class="col-sm-4" v-for="book in books" :key="book.id">
                  {{book.title}}

        </div>
        </div>

      <!-- <div class="card-columns">
        <div v-for="book in books" :key="book.id">
            <div class="card">
              <img class="card-img-top" src="" alt="Card image cap" />
              <div class="card-body">
                <h5 class="card-title">{{ book.title }}</h5>
                <p class="card-text">{{ book.description_short }}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
// import ClientListItem from "../components/ClientListItem.vue";

export default {
  // components: {
  //   ClientListItem,
  // },
  data() {
    return {
      books: null,
      loading: false,
      errors: {},
    };
  },
  computed: {},
  // methods: {
  //     handleFileObject() {
  //       this.avatar = this.$refs.file.files[0]
  //       this.avatarName = this.avatar.name
  //     },
  //   onClickChild(value) {
  //     console.log("remove ths id " + value); // someValue
  //     this.clients = this.clients.filter((client) => client.id !== value);
  //   },
  //   updateClient(id){
  //     console.log("update client id "+id)
  //     axios.put('/api/client/'+id, this.client)
  //                .then((res) => {
  //                  console.log("update worked");
  //                })
  //                .catch((error) => {
  //                  console.log("errors are")
  //                  console.log(error.response.status)
  //                  console.log(error.response.data.errors)

  //                }).finally(() => {
  //                    //Perform action in always
  //                });
  //   },

  //   saveClient() {
  //     console.log("add this client " + this.client.firstName);

  //     // let data = new FormData();
  //     // data.append("firstName", this.testdata);
  //     // console.log("this is data ",data)

  //      axios.post('/api/createclient', this.client)
  //                .then((res) => {
  //                    //Perform Success Action
  //                    console.log("added succesfully")
  //                    this.errors={}
  //                })
  //                .catch((error) => {
  //                  console.log("errors are")
  //                  console.log(error.response.status)
  //                  console.log(error.response.data.errors)
  //                  this.errors = error.response.data.errors
  //                  console.log("the saved errors")
  //                  console.log(this.errors.firstName)
  //                    // error.response.status Check status code
  //                }).finally(() => {
  //                    //Perform action in always
  //                });
  //   },
  // },
  created() {
    this.loading = true;

    axios.get("/api/books").then((response) => {
      console.log("dit werkt");
      console.log(response.data);
      this.books = response.data;
      this.loading = false;
    });
  },
};
</script>
