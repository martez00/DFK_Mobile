<template>
  <Page class="page">
    <AppActionBar page_name="Turnyro lentelė"/>
    <GridLayout class="page-content">
      <NoInternet v-if="noInternetFound === true" selected_page="Table"/>
      <GridLayout rows="40, *, 40" v-if="noInternetFound === false">
        <GridLayout columns="30, *, 30, 30" class="padding-items" style="background-color: #f7f7f7;" row="0">
          <Label
            class="place"
            horizontalAlignment="center"
            verticalAlignment="middle"
            col="0"
            text="Vt."
            textWrap="true"
          />
             <Label
            class="place"
            horizontalAlignment="left"
            verticalAlignment="middle"
            col="1"
            text="Komanda"
            textWrap="true"
          />
             <Label
            class="place"
            horizontalAlignment="center"
            verticalAlignment="middle"
            col="2"
            text="Ž"
            textWrap="true"
          />
             <Label
            class="place"
            horizontalAlignment="center"
            verticalAlignment="middle"
            col="3"
            text="T"
            textWrap="true"
          />
        </GridLayout>
        <ListView for="item in tableItems" @swipe="onSwipe" row="1">
          <v-template>
            <GridLayout
              columns="30, 30, *, 30, 30"
              class="padding-items"
              :class="checkIfDainava(item.team_id)"
            >
              <Label
                class="place"
                horizontalAlignment="center"
                verticalAlignment="middle"
                col="0"
                textWrap="true"
                :text="item.vieta"
              />
              <Image
                horizontalAlignment="center"
                verticalAlignment="middle"
                :src="item.foto"
                strech="aspectFit"
                col="1"
              />
              <Label
                class="team"
                horizontalAlignment="left"
                verticalAlignment="middle"
                col="2"
                textWrap="true"
                :text="item.pavadinimas"
              />
              <Label
                class="place"
                horizontalAlignment="center"
                verticalAlignment="middle"
                col="3"
                textWrap="true"
                :text="item.rungtyniu_skaicius"
              />
              <Label
                class="place"
                horizontalAlignment="center"
                verticalAlignment="middle"
                col="4"
                textWrap="true"
                :text="item.taskai"
              />
            </GridLayout>
          </v-template>
        </ListView>
        <StackLayout class="bottom-menu" orientation="horizontal" row="2">
          <Button
            width="50%"
            col="0"
            class="slider-btn"
            text="← REZULTATAI"
            @tap="$navigateTo(Results)"
          />
          <Button
            width="50%"
            col="1"
            class="slider-btn"
            text="ŽAIDĖJAI →"
            @tap="$navigateTo(Players)"
          />
        </StackLayout>
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
      log: [],
      Results: this.$routes.Results,
      Players: this.$routes.Players,
      noInternetFound: false,
      tableItems: []
    };
  },
  computed: {},
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
          this.getTableItems();
          break;
      }
    });
  },
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage("Table");
    if (this.noInternetFound == false) this.getTableItems();
  },
  methods: {
    checkIfDainava(id) {
      let dainavaClass = "";
      if (id == 1) dainavaClass = "main-team";
      return dainavaClass;
    },
    getTableItems() {
      axios
        .get(
          "http://dfkdainava.com/api/table.php?key=58945djdhjke9645Aed5584YTsdsf96"
        )
        .then(response => {
          console.log(response.data);
          this.tableItems = response.data;
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
  font-weight: bold;
  color: white;
  background-color: #5390f4;
}
.bottom-menu {
  border-top-color: #f4f4f4;
  border-top-width: 1;
  background-color: #f7f7f7;
}
.padding-items {
  padding: 8;
}
.place {
  font-weight: bold;
  font-size: 15;
}
.team {
  padding-left: 10;
  font-weight: bold;
  font-size: 15;
}
.main-team {
  background-color: #ea2a2a;
  color: white;
}
</style>