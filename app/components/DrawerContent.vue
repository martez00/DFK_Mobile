<template lang="html">
<GridLayout class="sidedrawer sidedrawer-left">
            <ScrollView row="1" class="sidedrawer-content">
                <StackLayout>
                  <StackLayout style="background-color:#ea2a2a;" horizontalAlignment="center" class="sidedrawer-list-item">
                   <Label text="Uždaryti meniu" style="color:white" class="p-r-10" @tap="closeDrawerHere"/>
                   </StackLayout>
                   <StackLayout class="hr-light"></StackLayout>
                    <GridLayout columns="auto, *" :class="'sidedrawer-list-item' + (selectedPage === 'Home' ? ' selected': '')" @tap="onNavigationItemTap(Home)">
                        <Image col="0" src="~/assets/news.png" class="fa"/>
                        <Label col="1" text="Naujienos" class="p-r-10"></Label>
                    </GridLayout>

                    <GridLayout columns="auto, *" :class="'sidedrawer-list-item' + (selectedPage === 'Schedule' ? ' selected': '')" @tap="onNavigationItemTap(Schedule)">
                        <Image col="0" src="~/assets/schedule.png" class="fa"/>
                        <Label col="1" text="Tvarkaraštis" class="p-r-10"></Label>
                    </GridLayout>


                    <GridLayout columns="auto, *" :class="'sidedrawer-list-item' + (selectedPage === 'Results' ? ' selected': '')" @tap="onNavigationItemTap(Results)">
                        <Image col="0" src="~/assets/results.png" class="fa"/>
                        <Label col="1" text="Rezultatai" class="p-r-10"></Label>
                    </GridLayout>

                     <GridLayout columns="auto, *" :class="'sidedrawer-list-item' + (selectedPage === 'Table' ? ' selected': '')" @tap="onNavigationItemTap(Table)">
                        <Image col="0" src="~/assets/standings.png" class="fa"/>
                        <Label col="1" text="Turnyro lentelė" class="p-r-10"></Label>
                    </GridLayout>

                     <GridLayout columns="auto, *" :class="'sidedrawer-list-item' + (selectedPage === 'Players' ? ' selected': '')" @tap="onNavigationItemTap(Players)">
                        <Image col="0" src="~/assets/players.png" class="fa"/>
                        <Label col="1" text="Žaidėjai" class="p-r-10"></Label>
                    </GridLayout>
                </StackLayout>
            </ScrollView>
        </GridLayout>
</template>

<script>
import Home from "./Home";
import Schedule from "./Schedule";
import Results from "./Results";
import Table from "./Table";
import Players from "./Players";
import Settings from "./Settings";

import * as utils from "~/shared/utils";
import SelectedPageService from "~/shared/selected-page-service";

export default {
  mounted() {
    SelectedPageService.getInstance().selectedPage$.subscribe(
      selectedPage => (this.selectedPage = selectedPage)
    );
  },
  data() {
    return {
      Home: Home,
      Schedule: Schedule,
      Results: Results,
      Table: Table,
      Players: Players,
      Settings: Settings,
      selectedPage: ""
    };
  },
  components: {
    Home,
    Schedule,
    Results,
    Table,
    Players,
    Settings
  },
  methods: {
    onNavigationItemTap(component) {
      this.$navigateTo(component);
      utils.closeDrawer();
    },
    closeDrawerHere() {
      utils.closeDrawer();
    }
  }
};
</script>

<style scoped lang="scss">
// Custom common variables
@import "../app-variables";

// Drawer navigation custom styles
$sidedrawer-header-image-size: 60;
$sidedrawer-header-image-offset-top: 20;
$sidedrawer-header-image-offset-bottom: 5;
$sidedrawer-list-item-offset-left: 15;
$sidedrawer-list-icon-offset: 10;
$sidedrawer-list-icon-size: 20;
.sidedrawer {
  &.sidedrawer-left {
    background-color: $ab-background;

    .sidedrawer-header-image {
      color: $background-dark;
      height: $sidedrawer-header-image-size;
      width: $sidedrawer-header-image-size;
      font-size: $sidedrawer-header-image-size;
      padding: 0;
      margin-bottom: $sidedrawer-header-image-offset-bottom;
      margin-top: $sidedrawer-header-image-offset-top;
    }

    .footnote {
      color: rgba($ab-color, 0.5);
    }
  }

  .sidedrawer-header {
    background-color: $ab-background;

    .sidedrawer-header-brand {
      color: $ab-color;
    }
  }

  .sidedrawer-content {
    background-color: $side-drawer-background;
  }

  .sidedrawer-list-item {
    padding-left: $sidedrawer-list-item-offset-left;

    label {
      vertical-align: center;
      color: $blue-dark;
    }

    .fa {
      width: $sidedrawer-list-icon-size;
      margin-right: $sidedrawer-list-icon-offset;
    }

    &.selected {
      background-color: $item-active-background;

      label {
        color: $item-active-color;
      }
    }
  }
}
</style>