<template>
    <div>

  
        <BookUserComponent></BookUserComponent>

   

    </div>
</template>

<script>
import BookUserComponent from "../components/BookUserComponent.vue";

export default {
  components: {
    BookUserComponent,
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
        console.log("getbook is called")
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
  mounted() {
  },

  created() {},
};
</script>
