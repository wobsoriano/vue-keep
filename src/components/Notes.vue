<template>
  <v-row>
    <v-col
      v-for="(note, idx) in notes"
      :key="idx"
      cols="12"
      sm="6"
      md="4"
      lg="3"
      xl="2"
    >
      <Note :note="note" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Note from './Note.vue';
import notesModule from '@/store/modules/notes';

@Component({
  components: {
    Note,
  },
})
export default class Notes extends Vue {
  get notes() {
    return notesModule.notes;
  }
}
</script>
