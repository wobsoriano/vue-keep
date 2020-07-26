<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="30"
        />

        <v-toolbar-title>VueKeep</v-toolbar-title>
      </div>

      <v-spacer></v-spacer>

      <v-btn href="https://github.com/sorxrob/vue-keep" target="_blank" text>
        <span class="mr-2">GitHub</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Create />

        <div class="text-center mt-2" v-if="loading">
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>

        <Notes v-else />

        <NoteModal />

        <v-snackbar v-model="snackbar.open" :color="snackbar.color">
          {{ snackbar.text }}
        </v-snackbar>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Create from './components/Create.vue';
import Notes from './components/Notes.vue';
import NoteModal from './components/NoteModal.vue';
import { namespace } from 'vuex-class';
import { Snackbar } from './store/models';

const notesModule = namespace('notes');
const globalModule = namespace('global');

@Component({
  components: {
    Create,
    Notes,
    NoteModal,
  },
})
export default class App extends Vue {
  loading = true;

  async created(): Promise<void> {
    await this.getNotes();
    this.loading = false;
  }

  @globalModule.State
  snackbar!: Snackbar;

  @notesModule.Action
  getNotes!: () => void;
}
</script>
