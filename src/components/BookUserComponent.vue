<template>
  <div>
    <div v-if="loading">Data is loading...</div>
    <div v-else>

              <RatingComponent></RatingComponent>

      {{ this.book }}
      <div class="container">
        <!-- <div class="row">
          <h3>{{book.title}}</h3>
        </div>
          <div class="row">
          <h6>{{book.book_series}}</h6>
        </div>
          <div class="row">
          <h6>{{book.author}}</h6>
        </div> -->

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
              <h3>{{ book.title }}</h3>
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
          <div class="col-sm-3"></div>
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
    };
  },
  computed: {},
  methods: {
    getBook() {
      console.log("getbook is called");
      this.loading = true;
      axios.get(`/api/books/${1}`).then((response) => {
        this.book = response.data;

        this.loading = false;
      });
    },
  },

  beforeMount() {
    this.getBook();
  },
  mounted() {},

  created() {},
};
</script>