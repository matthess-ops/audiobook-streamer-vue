<template>
  <div class="books">
    <h1>book library</h1>

    <p>router link</p>
    <router-link :to="{ name: 'book', params: { id } }">
      <h4>test router link</h4>
    </router-link>

    <input v-model="searchQuery" placeholder="search box" />
    <button @click="getSearchedBooks">Search</button>
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
              <router-link :to="{ name: 'book', params: {id: book.id} }">
                <h4>view book</h4>
              </router-link>
                  <button @click="removeBook(book.id)">delete</button>

            </div>
          </div>
        </div>
      </div>
    </div>
    {{ this.nextLink }}
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
      loadingNextLink: false,
      searchQuery: "EVEN",
      id: 1,
    };
  },
  computed: {},
  methods: {

    removeBook(id){
      axios.delete(`/api/book/${id}`).then((response) => {
        console.log("removed book");
        console.log(response.status);
        if(response.status ==200){
          this.books = this.books.filter(book => book.id !== id);

        }else{
          console.log("delete response else than 200 "+response.data.status)
        }
      });
    },

    getInitialBooks() {
      this.loading = true;

      axios.get("/api/scrollbooks").then((response) => {
        this.books = response.data.data;
        this.links = response.data.links;
        this.nextLink = response.data.links.next;
        this.loading = false;
      });
    },


    getSearchedBooks() {
      this.loading = true;

      if (this.searchQuery == "") {
        this.getInitialBooks();
      } else {
        axios

          .get(`/api/books/search/${this.searchQuery}`, {})
          .then((response) => {
            console.log("these are the searched books");
            console.log(response);
            this.books = response.data.data;
            this.links = response.data.links;
            this.nextLink = response.data.links.next;
            this.loading = false;
          });
      }
    },

    getNextBooks() {
      window.onscroll = () => {
        let bottomOfWindowRangeA =
          document.documentElement.scrollTop + window.innerHeight >
          document.documentElement.offsetHeight - 10;
        let bottomOfWindowRangeB =
          document.documentElement.scrollTop + window.innerHeight <
          document.documentElement.offsetHeight + 10;
        if (
          bottomOfWindowRangeA &&
          bottomOfWindowRangeB &&
          this.loadingNextLink == false &&
          this.nextLink != null
        ) {
          this.loadingNextLink = true;
          axios.get(this.nextLink).then((response) => {
            this.books = this.books.concat(response.data.data);
            this.links = response.data.links;
            this.nextLink = response.data.links.next;
            this.loadingNextLink = false;
          });
        }
      };
    },
  },

  beforeMount() {
    this.getInitialBooks();
    // this.getSearchedBooks();
  },
  mounted() {
    this.getNextBooks();
  },

  created() {},
};
</script>
