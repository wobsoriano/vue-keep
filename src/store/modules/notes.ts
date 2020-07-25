import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import { Note } from '../models';
import store from '@/store';

@Module({
  dynamic: true,
  store,
  name: 'notes',
})
class NotesModule extends VuexModule {
  notes: Note[] = [];

  @Mutation
  setNotes(note: Note) {
    this.notes.unshift(note);
  }

  @Mutation
  removeNote(id: string) {
    const idx = this.notes.findIndex((i) => i.id === id);
    this.notes.splice(idx, 1);
  }

  @Mutation
  updateNote(note: Note) {
    const idx = this.notes.findIndex((i) => i.id === note.id);
    if (idx !== -1) {
      this.notes[idx].title = note.title;
      this.notes[idx].content = note.content;
    }
  }

  @Action({ commit: 'setNotes' })
  saveNoteAsync(note: Note) {
    return {
      id: Date.now().toString(),
      ...note,
    };
  }

  @Action({ commit: 'removeNote' })
  removeNoteAsync(id: string) {
    return id;
  }

  @Action({ commit: 'updateNote' })
  updateNoteAsync(note: Note) {
    return {
      id: Date.now().toString(),
      ...note,
    };
  }
}

export default getModule(NotesModule);
