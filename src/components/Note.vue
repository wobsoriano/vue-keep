<template>
  <v-card outlined hover>
    <v-card-title>{{ note.title }}</v-card-title>
    <v-card-text>
      {{ note.content }}
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Note } from '@/store/models';

@Component
export default class NoteItem extends Vue {
  @Prop({ type: Object as () => Note, required: true })
  note!: Note;
}
</script>
