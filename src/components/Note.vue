<template>
  <v-card
    outlined
    hover
    class="flex d-flex flex-column"
    @mouseenter="toggleEditIcon"
    @mouseleave="toggleEditIcon"
    @click="viewNote"
  >
    <v-card-title>
      {{ note.title }}
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon v-show="showEditIcon">mdi-pencil-outline</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text v-text="note.content"></v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Note } from '@/store/models';
import { namespace } from 'vuex-class';

const globalModule = namespace('global');

@Component
export default class NoteItem extends Vue {
  @Prop({ type: Object as () => Note, required: true })
  note!: Note;

  showEditIcon = false;

  toggleEditIcon(): void {
    this.showEditIcon = !this.showEditIcon;
  }

  viewNote(): void {
    this.setSelectedNote(this.note);
    this.setShowNoteDialog(true);
  }

  @globalModule.Mutation
  setSelectedNote!: (note: Note) => void;

  @globalModule.Mutation
  setShowNoteDialog!: (payload: boolean) => void;
}
</script>
