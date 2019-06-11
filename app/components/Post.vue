<template>
  <Page class="page">
    <AppActionBar page_name="Naujienos"/>
    <GridLayout class="page-content">
      <ScrollView row="0">
        <StackLayout class="padding-items">
          <Image
            src="https://www.shareicon.net/data/2016/08/18/809860_arrows_512x512.png"
            @tap="$navigateBack"
            horizontalAlignment="left"
            class="backbtn"
          />
          <Image :src="post.display_image" class="foto" horizontalAlignment="center"/>
          <Label
            textWrap="true"
            :text="post.title.rendered"
            class="title"
            horizontalAlignment="center"
          />
          <Label textWrap="true" :text="post.content_text" horizontalAlignment="center"/>
        </StackLayout>
      </ScrollView>
    </GridLayout>
  </Page>
</template>

<script>
import axios from "axios";
import SelectedPageService from "../shared/selected-page-service";
import ActionBarComponent from "./ActionBar.vue";

export default {
  props: ["post_article"],
  components: {
    AppActionBar: ActionBarComponent
  },
  data() {
    return {
      post: this.post_article
    };
  },
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage("Home");
  },
  computed: {},
  methods: {}
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
