<template>
  <Page class="page">
    <AppActionBar page_name="Naujienos"/>
    <GridLayout class="page-content">
      <GridLayout rows="*, 20, 40">
        <ListView for="post in posts" row="0" @swipe="onSwipe">
          <v-template>
            <StackLayout orientation="horizontal" class="padding-items" @tap="openPost(post)">
              <StackLayout width="140" horizontalAlignment="left" verticalAlignment="middle">
                <Image :src="post.display_image" stretch="aspectFit"></Image>
              </StackLayout>
              <StackLayout orientation="vertical" class="post-content">
                <Label :text="post.title.rendered" class="title" textWrap="true"/>
                <Label :text="post.exceprt_text" textWrap="true"/>
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

export default {
  components: {
    AppActionBar: ActionBarComponent,
  },
  data() {
    return {
      pageNumber: 0,
      posts: [],
      log: [],
      Schedule: this.$routes.Schedule,
      Post: this.$routes.Post,
    };
  },
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage("Home");
    this.getPosts();
  },
  computed: {},
  methods: {
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
          let tmp_posts = response.data;
          tmp_posts.forEach(function(post) {
            post.exceprt_text =
              post.excerpt.rendered
                .replace(/(<([^>]+)>)/gi, "")
                .substring(0, 90) + "...";
            post.display_image =
              "http:/dfkdainava.com/wp-content/uploads/" +
              post._embedded["wp:featuredmedia"]["0"].media_details.file;
            post.content_text = post.content.rendered;
          });
          this.posts = this.posts.concat(tmp_posts);
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