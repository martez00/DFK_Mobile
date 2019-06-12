<template>
  <Page class="page">
    <AppActionBar page_name="Naujienos"/>
    <GridLayout class="page-content">
      <NoInternet v-if="noInternetFound === true" selected_page="Home"/>
      <GridLayout v-if="noInternetFound === false" rows="*, 20, 40">
        <ListView for="post in posts" row="0" @swipe="onSwipe">
          <v-template>
            <StackLayout orientation="horizontal" class="padding-items" @tap="openPost(post)">
              <StackLayout width="140" horizontalAlignment="left" verticalAlignment="middle">
                <Image :src="getPostImage(post)" stretch="aspectFit"></Image>
              </StackLayout>
              <StackLayout orientation="vertical" class="post-content">
                <Label :text="getTitle(post.title.rendered)" class="title" textWrap="true"/>
                <Label :text="getExcerptText(post.excerpt.rendered)" textWrap="true"/>
              </StackLayout>
            </StackLayout>
          </v-template>
        </ListView>
        <Label
          horizontalAlignment="center"
          verticalAlignment="middle"
          text="Rodyti daugiau naujienų"
          @tap="getPosts"
          row="1"
        />
        <GridLayout columns="*" class="bottom-menu" row="2">
          <Button
            col="0"
            class="slider-btn"
            verticalAlignment="middle"
            text="TVARKARAŠTIS →"
            @tap="$navigateTo(Schedule)"
          />
        </GridLayout>
      </GridLayout>
    </GridLayout>
  </Page>
</template>

<script>
import axios from "axios";
import SelectedPageService from "../shared/selected-page-service";
import ActionBarComponent from "./ActionBar.vue";
import NoInternet from "./NoInternet.vue";
const SwipeDirection = require("tns-core-modules/ui/gestures").SwipeDirection;
const connectivityModule = require("tns-core-modules/connectivity");

export default {
  components: {
    AppActionBar: ActionBarComponent,
    NoInternet: NoInternet
  },
  data() {
    return {
      pageNumber: 0,
      posts: [],
      log: [],
      Schedule: this.$routes.Schedule,
      Post: this.$routes.Post,
      noInternetFound: false
    };
  },
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage("Home");
    if (this.noInternetFound == false) this.getPosts();
  },
  created() {
    const myConnectionType = connectivityModule.getConnectionType();
    switch (myConnectionType) {
      case connectivityModule.connectionType.none:
        console.log("No connection");
        this.noInternetFound = true;
        break;
      default:
        this.noInternetFound = false;
        break;
    }
    connectivityModule.startMonitoring(newConnectionType => {
      switch (newConnectionType) {
        case connectivityModule.connectionType.none:
          console.log("Connection type changed to none.");
          this.noInternetFound = true;
          break;
        default:
          this.noInternetFound = false;
          if (!Array.isArray(this.posts) || !this.posts.length) {
            this.getPosts();
          }
          break;
      }
    });
  },
  computed: {},
  methods: {
    getPostImage(post) {
      return (
        "http://www.dfkdainava.com/wp-content/uploads/" +
        post._embedded["wp:featuredmedia"]["0"].media_details.file
      );
    },
    getExcerptText(text) {
      let returnValue =
        text
          .replace(/(<([^>]+)>)/gi, "")
          .replace(/&#8230;/gi, "!")
          .replace(/&#8211;/gi, "–")
          .replace(/&nbsp;/gi, "")
          .substring(0, 90) + "...";
      return returnValue;
    },
    getTitle(title) {
      return title
        .replace(/(<([^>]+)>)/gi, "")
        .replace(/&#8211;/gi, "–")
        .replace(/&nbsp;/gi, "")
        .replace(/&#8230;/gi, "!");
    },
    openPost(selectedPost) {
      this.$navigateTo(this.Post, {
        props: {
          post_article: selectedPost
        }
      });
    },
    getPosts() {
      this.pageNumber++;
      axios
        .get(
          "http://www.dfkdainava.com/wp-json/wp/v2/posts?_embed&per_page=10&page=" +
            this.pageNumber
        )
        .then(response => {
          this.posts = this.posts.concat(response.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSwipe(args) {
      let direction =
        args.direction == SwipeDirection.down
          ? "down"
          : args.direction == SwipeDirection.up
          ? "up"
          : args.direction == SwipeDirection.left
          ? "left"
          : "right";
      this.log.unshift({
        text: "You performed a " + direction + " swipe"
      });
      if (direction == "left") this.$navigateTo(this.$routes.Schedule);
    }
  }
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../app-variables";
// End custom common variables

// Custom styles
.action-image {
  width: 37;
  height: 37;
  vertical-align: center;
}
.slider-btn {
  font-size: 12;
  font-weight: bold;
  color: white;
  background-color: #5390f4;
}
.bottom-menu {
  border-top-color: #f4f4f4;
  border-top-width: 1;
  background-color: #f7f7f7;
}
.title {
  font-weight: bold;
}
.padding-items {
  padding: 5;
}
.post-content {
  padding-left: 5;
}
</style>