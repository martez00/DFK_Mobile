<template>
  <Page class="page">
    <AppActionBar page_name="Žaidėjai"/>
    <GridLayout class="page-content">
      <NoInternet v-if="noInternetFound === true" selected_page="Players"/>
      <GridLayout rows="*, 40" v-if="noInternetFound === false">
        <ListView for="player in players" row="0" @swipe="onSwipe">
          <v-template>
            <GridLayout columns="90, *, 40" rows="1*" class="padding-items">
              <Image
                stretch="aspectFit"
                :src="player.player_foto"
                verticalAlignment="middle"
                horizontalAlignment="left"
                class="logo"
                height="60"
                row="0"
                col="0"
              />
              <GridLayout rows="*, *" row="0" col="1" verticalAlignment="middle">
                <StackLayout orientation="horizontal" horizontalAlignment="center" row="0">
                  <Label textWrap="true" class="title" :text="player.vardas + ' '"></Label>
                  <Label textWrap="true" class="title" :text="player.pavarde"></Label>
                </StackLayout>
                <StackLayout orientation="horizontal" horizontalAlignment="center" row="1">
                  <Label textWrap="true" :text="player.gdata"></Label>
                </StackLayout>
              </GridLayout>
              <Image
                :src="getPositionImage(player.pozicija)"
                row="0"
                col="2"
                horizontalAlignment="center"
                verticalAlignment="middle"
                stretch="aspectFit"
                height="30"
              />
            </GridLayout>
          </v-template>
        </ListView>
        <GridLayout columns="*" class="bottom-menu" row="1">
          <Button col="0" class="slider-btn" text="← TURNYRO LENTELĖ" @tap="$navigateTo(Table)"/>
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
      players: [],
      log: [],
      Table: this.$routes.Table,
      noInternetFound: false
    };
  },
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage("Players");
    if (this.noInternetFound == false) this.getPlayers();
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
  methods: {
    getPositionImage(position) {
      var posFoto = "";
      if (position == 4) posFoto = "~/assets/striker.png";
      else if (position == 3) posFoto = "~/assets/midfielder.png";
      else if (position == 1) posFoto = "~/assets/goalkeeper.png";
      else if (position == 2) posFoto = "~/assets/tackle.png";
      return posFoto;
    },
    getPlayers() {
      axios
        .get(
          "http://dfkdainava.com/api/players.php?key=58945djdhjke9645Aed5584YTsdsf96"
        )
        .then(response => {
          this.players = response.data;
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
      if (direction == "right") this.$navigateTo(this.$routes.Table);
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
.position-title {
  font-size: 20;
  font-weight: bold;
}
</style>