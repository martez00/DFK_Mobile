<template>
  <Page class="page">
    <AppActionBar page_name="Naujienos"/>
    <GridLayout class="page-content" @swipe="onSwipe">
      <Label class="page-icon fa" text.decode="&#xf015;"></Label>
      <Label class="page-placeholder" :text="message"></Label>
    </GridLayout>
  </Page>
</template>

<script>
import SelectedPageService from "../shared/selected-page-service";
import ActionBarComponent from "./ActionBar.vue";
const SwipeDirection = require("tns-core-modules/ui/gestures").SwipeDirection;

export default {
  components: {
    AppActionBar: ActionBarComponent,
  },
  data () {
        return {
            log: []
        };
    },
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage("Home");
  },
  computed: {
    message() {
      return "Pagrindinis naujienų puslpais";
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
            if(direction=="left")
              this.$navigateTo(this.$routes.Schedule);
        },
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
</style>