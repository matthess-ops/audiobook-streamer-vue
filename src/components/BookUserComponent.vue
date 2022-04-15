<template>
  <div>
    <div v-if="loading">Data is loading...</div>
    <div v-else>


      <div class="container">
        <h4>user id: {{this.$store.state.auth.user.id}}</h4>
          {{this.$route.params.id}}
        <div class="row">
          <div class="col-sm-3">
            <img
              v-bind:src="book.cover_image"
              class="img-fluid"
              alt="Responsive image"
            />
          </div>
          <div class="col-sm-6">
            <div class="row">
              <div class="col">
                              <h3>{{ book.title }}</h3>

              </div>
                <div class="col d-flex align-items-center">
                        <RatingComponent :ratingg="book.rating" />

              </div>
            </div>
            <div class="row">
              <h6 class="text-secondary">({{ book.book_series }})</h6>
            </div>
            <div class="row">
              <h6 class="text-secondary">by {{ book.author }}</h6>
            </div>
             <div class="row">
              <h6 class="text-secondary">{{ book.rating }}</h6>
            </div>
             <div class="row">
              <p>{{ book.description_large }}</p>
            </div>
           
          </div>
          <div class="col-sm-3">
            AddToPlayer
          <!-- <button @click="$router.push({name: 'Home'})">go to home</button> -->
                  <button @click="AddToPlayer()">add to player</button>



          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RatingComponent from "../components/RatingComponent.vue";

export default {
    components: {
    RatingComponent,
  },
  data() {
    return {
      book: null,
      loading: false,
      id: this.$route.params.id,
      playListData: {
        bookId: this.$route.params.id,
        userId: this.$store.state.auth.user.id,
      },
      
    };
  },
  computed: {},
  methods: {
    getBook() {
      console.log("getbook is called");
      this.loading = true;
      axios.get(`/api/books/${this.id}`).then((response) => {
        this.book = response.data;

        this.loading = false;
      });
    },
    AddToPlayer(){
    console.log(this.playListData)
        axios.post('/api/setplaylist',this.playListData).then((response) => {
        if(response.status ===200){
          console.log(response);
          const bookToPlay = response.data
          this.$router.push({ name: 'player', params: { id: bookToPlay  } })
        }

      });

    
       
    }
  },

  beforeMount() {
    console.log("store data")
      console.log(this.$store.state.auth.user.id)

    this.getBook();
  },
  mounted() {},

  created() {},
};
</script>