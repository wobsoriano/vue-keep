<template>
  <v-row justify="center">
    <v-col cols="12" md="8" lg="6" xl="4">
      <v-card>
        <div class="pa-2">
          <v-text-field
            v-model="note.title"
            v-show="titleFieldVisible"
            label="Title"
            single-line
            flat
            solo
          ></v-text-field>
          <v-textarea
            v-model="note.content"
            @focus="showTitleFieldAndActions"
            :rows="2"
            auto-grow
            flat
            solo
            label="Take a note..."
            single-line
          ></v-textarea>
        </div>
        <v-card-actions v-show="actionsVisible">
          <v-spacer></v-spacer>
          <v-btn text @click="close">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { NewNote, Note, Snackbar } from '@/store/models';
import { namespace } from 'vuex-class';
import { SnackbarColorTypes } from '../store/enums';

const globalModule = namespace('global');
const notesModule = namespace('notes');

@Component
export default class Create extends Vue {
  note: NewNote = {
    title: '',
    content: '',
  };

  titleFieldVisible = false;
  actionsVisible = false;

  showTitleFieldAndActions(): void {
    this.titleFieldVisible = true;
    this.actionsVisible = true;
  }

  hideTitleFieldAndActions(): void {
    this.titleFieldVisible = false;
    this.actionsVisible = false;
  }

  @notesModule.Action
  createNote!: (newNote: NewNote) => Promise<Note>;

  @globalModule.Mutation
  showSnackbar!: (snackbar: Snackbar) => void;

  async close(): Promise<void> {
    this.hideTitleFieldAndActions();

    if (this.note.title || this.note.content) {
      await this.createNote(this.note);
      this.showSnackbar({
        open: true,
        text: 'Note saved',
        color: SnackbarColorTypes.Success,
      });
    }

    this.note = {
      title: '',
      content: '',
    };
  }
}
</script>
