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
import { Note } from '@/store/models';
import notesModule from '@/store/modules/notes';

@Component
export default class Create extends Vue {
  note: Note = {
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

  async close(): Promise<void> {
    this.hideTitleFieldAndActions();
    notesModule.saveNoteAsync(this.note);
    this.note = {
      title: '',
      content: '',
    };
  }
}
</script>
