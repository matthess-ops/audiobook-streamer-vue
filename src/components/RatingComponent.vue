<template>
  <div>
         <font-awesome-icon :icon="['fas', 'star']" />
    <!-- regular faFile -->
    <font-awesome-icon :icon="['far', 'star']" />
     

  <!-- <font-awesome-icon icon="fa-star" />
    <font-awesome-icon icon="fa-user-secret" />
<font-awesome-icon icon="fa-regular fa-star" />
<font-awesome-icon :icon="['fas', 'spinner']" />
<font-awesome-icon icon="fa-regular fa-star" /> -->

  <!-- <link rel="stylesheet" 
        href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" 
        integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" 
        crossorigin="anonymous">
    <h1>Using Font Awesome "Brand" icons in Vue.js</h1>
    <p>Have a cup of coffee: <i class="fa-regular fa-star"></i> </p>
    <p>Have a module of JavaScript: <i class="fab fa-js"></i> </p>
    <p>Have a module of Vue.js: <i class="fab fa-vuejs"></i> </p> -->
  </div>
</template>

<script>
// import ClientListItem from "../components/ClientListItem.vue";

export default {
  data() {
    return {
      rating: 3.46,
      nrWholeStars: null,
      nrEmptyStarts:null,
    };
  },
  computed: {},
  methods: {
    calcWholeStars(){
        this.nrWholeStars = Math.round(this.rating)
        this.nrEmptyStarts = 5-this.nrWholeStars
    }
  },

  beforeMount() {},
  mounted() {},

  created() {},
};
</script>