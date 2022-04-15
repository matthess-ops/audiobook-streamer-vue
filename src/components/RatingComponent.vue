<template>
  <div>
    <div class="container">
      <font-awesome-icon
        v-for="star in nrWholeStars"
        :key="'full'+star"
        :icon="['fas', 'star']"
      />
      <font-awesome-icon
        v-for="star in nrEmptyStarts"
        :key="'empty'+star"
        :icon="['far', 'star']"
      />
    </div>
  </div>
</template>

<script>
// import ClientListItem from "../components/ClientListItem.vue";

export default {
   props: {
    ratingg: String
  },

  data() {
    return {
      rating: parseFloat(this.ratingg),
      nrWholeStars: null,
      nrEmptyStarts: null,
    };
  },
  computed: {},
  methods: {
    calcWholeStars() {
      this.nrWholeStars = Math.round(this.rating);
      this.nrEmptyStarts = 5 - this.nrWholeStars;
    },
  },

  beforeMount() {
    this.calcWholeStars();
  },
  mounted() {},

  created() {},
};
</script>