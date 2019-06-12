<template>
  <Page class="page">
    <AppActionBar page_name="Naujienos"/>
    <GridLayout class="page-content">
      <NoInternet v-if="noInternetFound === true" selected_page="Home"/>
      <ScrollView v-if="noInternetFound === false">
        <StackLayout class="padding-items" @swipe="onSwipe">
          <Image
            src="~/assets/back.png"
            @tap="$navigateBack"
            horizontalAlignment="left"
            class="backbtn"
          />
          <Label
            textWrap="true"
            :text="getTitle(post.title.rendered)"
            class="title"
            horizontalAlignment="center"
          />
          <Image :src="getPostImage(post)" class="foto" horizontalAlignment="center"/>
          <HtmlView :html="post.content.rendered" @swipe="onSwipe"/>
        </StackLayout>
      </ScrollView>
    </GridLayout>
  </Page>
</template>

<script>
const HtmlView = require("tns-core-modules/ui/html-view").HtmlView;
const SwipeDirection = require("tns-core-modules/ui/gestures").SwipeDirection;
import axios from "axios";
import SelectedPageService from "../shared/selected-page-service";
import ActionBarComponent from "./ActionBar.vue";
import NoInternet from "./NoInternet.vue";
const connectivityModule = require("tns-core-modules/connectivity");

export default {
  props: ["post_article"],
  components: {
    AppActionBar: ActionBarComponent,
    NoInternet: NoInternet
  },
  data() {
    return {
      post: this.post_article,
      log: [],
      noInternetFound: false
    };
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
          break;
      }
    });
  },
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage("Home");
  },
  computed: {},
  methods: {
    getPostImage(post) {
      return (
        "http://www.dfkdainava.com/wp-content/uploads/" +
        post._embedded["wp:featuredmedia"]["0"].media_details.file
      );
    },
    getTitle(title) {
      return title
        .replace(/(<([^>]+)>)/gi, "")
        .replace(/&#8211;/gi, "–")
        .replace(/&nbsp;/gi, "")
        .replace(/&#8230;/gi, "!");
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
      if (direction == "right") this.$navigateTo(this.$routes.Home);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../app-variables";

.title {
  font-weight: bold;
  font-size: 20;
}
.padding-items {
  padding: 10;
}
.foto {
  width: 100%;
}
.backbtn {
  width: 80px;
  margin-bottom: 15px;
}
</style>
