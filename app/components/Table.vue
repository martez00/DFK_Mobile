<template>
  <Page class="page">
    <AppActionBar page_name="Turnyro lentelė"/>
    <GridLayout class="page-content">
      <GridLayout rows="*, 40">
        <ScrollView row="0" @swipe="onSwipe">
          <Label class="page-icon fa" text.decode="&#xf015;"></Label>
          <Label class="page-placeholder" :text="message"></Label>
        </ScrollView>
        <StackLayout class="bottom-menu" orientation="horizontal" row="1">
          <Button width="50%" col="0" class="slider-btn" text="← REZULTATAI" @tap="$navigateTo(Results)"/>
          <Button width="50%" col="1" class="slider-btn" text="ŽAIDĖJAI →" @tap="$navigateTo(Players)"/>
        </StackLayout>
      </GridLayout>
    </GridLayout>
  </Page>
</template>

<script>
import SelectedPageService from "../shared/selected-page-service";
import ActionBarComponent from "./ActionBar.vue";
const SwipeDirection = require("tns-core-modules/ui/gestures").SwipeDirection;

export default {
  components: {
    AppActionBar: ActionBarComponent
  },
  data() {
    return {
      log: [],
      Results: this.$routes.Results,
      Players: this.$routes.Players,
    };
  },
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage("Table");
  },
  computed: {
    message() {
      return "Turnyro lentelė";
    }
  },
  methods: {
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
      if (direction == "left") this.$navigateTo(this.$routes.Players);
      else if (direction == "right") this.$navigateTo(this.$routes.Results);
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
  font-weight:bold;
  color:white;
  background-color: #5390f4;
}
.bottom-menu{
border-top-color: #f4f4f4;
border-top-width: 1;
background-color: #f7f7f7;
}
</style>