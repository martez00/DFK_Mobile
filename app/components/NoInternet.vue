<template>
  <GridLayout class="page-content">
    <GridLayout rows="*">
      <ScrollView row="0">
        <Label class="page-placeholder" :text="message" textWrap="true"></Label>
      </ScrollView>
    </GridLayout>
  </GridLayout>
</template>

<script>
import SelectedPageService from "../shared/selected-page-service";
import ActionBarComponent from "./ActionBar.vue";
const SwipeDirection = require("tns-core-modules/ui/gestures").SwipeDirection;

export default {
  props: ["selected_page"],
  components: {
    AppActionBar: ActionBarComponent
  },
  data() {
    return {
      log: [],
      openedPage: this.selected_page,
    };
  },
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage(this.openedPage);
  },
  computed: {
    message() {
      return "Nėra interneto ryšio";
    }
  },
  methods: {}
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
</style>