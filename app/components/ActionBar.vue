<template>
  <ActionBar class="action-bar">
    <NavigationButton ios:visibility="collapsed" icon="res://menu" @tap="onDrawerButtonTap"></NavigationButton>
    <GridLayout columns="auto, *, auto">
      <ActionItem
        icon="res://navigation/menu"
        android:visibility="collapsed"
        @tap="onDrawerButtonTap"
        ios:horizontalAlignment="left"
        android:horizontalAlignment="left"
        col="0"
      ></ActionItem>
      <Label
        class="action-bar-title"
        :text="pageName"
        ios:horizontalAlignment="left"
        android:horizontalAlignment="left"
        col="1"
      />
      <Image
        src="http://dfkdainava.com/logos/dfk.png"
        class="action-image"
        ios:horizontalAlignment="right"
        android:horizontalAlignment="right"
        col="2"
      />
    </GridLayout>
  </ActionBar>
</template>

<script>
import * as utils from "~/shared/utils";
import SelectedPageService from "../shared/selected-page-service";
export default {
  props: ["page_name"],
  data() {
    return {
      pageName: this.page_name,
    };
  },
  methods: {
    onDrawerButtonTap() {
      utils.showDrawer();
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
.action-bar{
    background-color:#ea2a2a;
}
</style>