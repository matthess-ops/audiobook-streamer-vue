<template>
  <div class="container">
    <h4>this is player page</h4>
    <h4>playlist id to play = {{ this.$route.params.id }}</h4>
    <!-- current time{{ this.playData.current_time }} -->

    <div v-if="loading">Data is loading...</div>
    <div v-else>
      <h4>player loaded</h4>
      <div class="row">
        <h6 class="text-secondary">({{ book.book_series }})</h6>
      </div>
      <div class="row">
        <h6 class="text-secondary">by {{ book.author }}</h6>
      </div>

      <figure>
        <figcaption>Listen to the T-Rex:</figcaption>
        <audio id="audioObject" controls v-bind:src="url">
          <!-- <audio id="audioObject" controls src="http://localhost:8000/getaudio"> -->
          Your browser does not support the
          <code>audio</code> element.
        </audio>

        <!-- {{ console.log("tttt") }} -->
        <button @click="play()">play</button>
        <button @click="stop()">stop</button>
        <button @click="jump()">jump</button>
      </figure>
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
      playData: null,
      currentPlayTime: 0,
      url: "http://localhost:8000/getaudio",
      previousTime: 0,
    };
  },
  computed: {},
  methods: {
    beginLastPlayBack() {
      const audioStreamer = document.getElementById("audioObject");

      audioStreamer.currentTime = parseFloat(this.playData.current_time);
    },

    getCurrentPlayTime() {
      const audioStreamer = document.getElementById("audioObject");

      setInterval(function () {
                  console.log(audioStreamer.currentTime);

        if (audioStreamer.currentTime != this.previousTime) {
            this.currentPlayTime = audioStreamer.currentTime;
          this.previousTime = audioStreamer.currentTime;
          console.log("time is different");
          const sendData = {
            newCurrentTime: this.currentPlayTime,
            playlistId: this.id,
          };
          // axios.post("/api/updateplaytime", sendData).then((response) => {});
        } else {
                    console.log("time is same");

          // console.log("time the same");
          // console.log("current " + this.currentPlayTime);
          // console.log("previous " + this.previousTime);
        }
      }, 1000);
    },
    getBook() {
      console.log("getbook is called");
      this.loading = true;
      axios.get(`/api/books/${this.id}`).then((response) => {
        this.book = response.data;

        this.loading = false;
      });
    },
    getPlaylistData() {
      console.log("getPlaylistData is called");
      this.loading = true;
      axios.get(`/api/playlist/${this.id}`).then((response) => {
        console.log(response.data.playData);
        this.book = response.data.bookData;
        this.playData = response.data.playData;
        this.loading = false;
      });
    },
    play() {
      console.log("music should be playing");
      document.getElementById("audioObject").play();
    },

    stop() {
      console.log("music should be stopped");
      document.getElementById("audioObject").pause();
      console.log(document.getElementById("audioObject").currentTime);
    },

    jump() {
      console.log("jump music");
      const audioStreamer = document.getElementById("audioObject");
      audioStreamer.currentTime = 150;
    },
  },

  beforeMount() {},
  mounted() {},

  created() {
    this.getPlaylistData();
  },

  updated() {
    this.beginLastPlayBack();
    this.getCurrentPlayTime();
  },
};
</script>