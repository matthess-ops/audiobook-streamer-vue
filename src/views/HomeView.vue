<template>
  <div class="books">
    <h1>book library</h1>
    <div v-if="loading">Data is loading...</div>
    <div v-else>
      <div class="row">
        <div class="col-sm-4" v-for="book in books" :key="book.id">
          <div class="card h-100">
            <img class="card-img-top" v-bind:src="book.cover_image" alt="" />
            <div class="card-body">
              <h6 class="card-title">{{ book.title }}</h6>
              <p class="card-text" style="font-size: 10px">
                {{ book.description_short }}
              </p>
            </div>
          </div>
        </div>
      </div>
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
      links: null,
      nextLink: null,
    };
  },
  computed: {},
  methods: {
    getImage() {
      return "http://localhost:8081/storage/cover_images/5._SY475_.jpg";
      // return  'http://localhost:8000/storage/uploads/1646130572_stratobestelling.jpg';
    },
    getInitialBooks() {
      this.loading = true;
      const from = 0;
      const to = 3;
      axios.get("/api/scrollbooks/" + from + "/" + to).then((response) => {
        this.books = response.data.data;
        this.links = response.data.links;
        this.nextLink = response.data.links.next;
        console.log("a " + this.nextLink);
        this.loading = false;
      });
    },

    getNextBooks() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          console.log(this.nextLink);
          axios.get(this.nextLink).then((response) => {
                        console.log("----")
            console.log(this.books)

            // console.log(response.data.data);
            this.books =this.books.concat(response.data.data);
            console.log(this.books)
            this.links = response.data.links;
            this.nextLink = response.data.links.next;
            console.log("a " + this.nextLink);
            this.loading = false;
          });
        }
      };
    },
  },

  beforeMount() {
    this.getInitialBooks();
  },
  mounted() {
    this.getNextBooks();
  },

  created() {},
};
</script>
