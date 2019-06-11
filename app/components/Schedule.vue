<template>
  <Page class="page">
    <AppActionBar page_name="Tvarkaraštis"/>
    <ScrollView orientation="vertical">
      <ListView for="match in matches">
        <v-template>
          <GridLayout columns="30, *, 30" rows="1*" class="padding-items">
            <Image
              :src="match.home_team_foto"
              verticalAlignment="middle"
              horizontalAlignment="left"
              class="logo"
              height="40"
              width="40"
              row="0"
              col="0"
            />
            <GridLayout columns="1*" rows="*, *, *" row="0" col="1" verticalAlignment="middle">
              <StackLayout orientation="horizontal" horizontalAlignment="center" row="0" col="1">
                <Label textWrap="true" class="title" :text="match.home_team_pav"></Label>
                <Label textWrap="true" class="title" text=" – "></Label>
                <Label textWrap="true" class="title" :text="match.away_team_pav"></Label>
              </StackLayout>
              <StackLayout orientation="horizontal" horizontalAlignment="center" row="1" col="1">
                <Label textWrap="true" :text="match.data_be_metu + ' '"></Label>
                <Label textWrap="true" :text="match.time + ', '"></Label>
                <Label textWrap="true" :text="getMatchType(match)"></Label>
              </StackLayout>
              <StackLayout orientation="horizontal" horizontalAlignment="center" row="2" col="1">
                <Label textWrap="true" :text="match.stadionas"></Label>
              </StackLayout>
            </GridLayout>
            <Image
              :src="match.away_team_foto"
              verticalAlignment="middle"
              horizontalAlignment="right"
              class="logo"
              height="40"
              width="40"
              row="0"
              col="2"
            />
          </GridLayout>
        </v-template>
      </ListView>
    </ScrollView>
  </Page>
</template>

<script>

import axios from 'axios';
import SelectedPageService from "../shared/selected-page-service";
import ActionBarComponent from "./ActionBar.vue";

export default {
  components: {
    AppActionBar: ActionBarComponent
  },
  data() {
    return {
      matches: []
    };
  },
  mounted() {
    SelectedPageService.getInstance().updateSelectedPage("Schedule");
    this.getMatches();
  },
  computed: {},
  methods: {
    getMatchType(match) {
      let type = "";
      switch (match.tipas) {
        case "1":
          type = "LFF I Lyga";
          break;
        case "2":
          type = "LFF II Lyga";
          break;
        case "3":
          type = "A Lyga";
          break;
        case "4":
          type = "Draugiškos";
          break;
        case "5":
          type = "UEFA Europos Lyga";
          break;
        case "6":
          type = "UEFA Čempionų Lyga";
          break;
        case "7":
          type = "LFF Taurė";
          break;
        case "8":
          type = "LFF Supertaurė";
          break;
      }
      return type;
    },
    getMatches() {
      axios
        .get(
          "http://dfkdainava.com/api/schedule.php?key=58945djdhjke9645Aed5584YTsdsf96"
        )
        .then(response => {
          console.log(response.data);
          this.matches = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped lang="scss">
// Start custom common variables
@import "../app-variables";
// End custom common variables

// Custom styles
.title {
  font-weight: bold;
}
.padding-items {
  padding: 15;
}
.logo {
  height: 100%;
}
</style>