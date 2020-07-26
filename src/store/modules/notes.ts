import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { Note, NewNote } from '../models';
import { db } from '@/firebase';

@Module({
  namespaced: true,
})
export default class NotesModule extends VuexModule {
  notes: Note[] = [];

  @Mutation
  setNotes(notes: Note[]): void {
    this.notes = notes;
  }

  @Mutation
  addNote(note: Note): void {
    this.notes.unshift(note);
  }

  @Mutation
  removeNote(id: string): void {
    const idx = this.notes.findIndex((i) => i.id === id);
    if (idx !== -1) {
      this.notes.splice(idx, 1);
    }
  }

  @Mutation
  setNote(note: Note): void {
    const idx = this.notes.findIndex((i) => i.id === note.id);
    if (idx !== -1) {
      this.notes[idx].title = note.title;
      this.notes[idx].content = note.content;
    }
  }

  @Action({ commit: 'setNotes' })
  async getNotes(): Promise<Note[]> {
    const notes = await db.getNotes();
    return notes;
  }

  @Action({ commit: 'addNote' })
  async createNote(note: NewNote): Promise<Note> {
    const data = await db.createNote(note);
    return data;
  }

  @Action({ commit: 'removeNote' })
  async removeNoteAsync(id: string): Promise<string> {
    await db.deleteNote(id);
    return id;
  }

  @Action({ commit: 'setNote' })
  async updateNote(note: Note): Promise<Note> {
    await db.updateNote(note);
    return note;
  }
}
