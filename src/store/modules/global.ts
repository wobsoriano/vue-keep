import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { Note, Snackbar, EditNoteField } from '@/store/models';
import { SnackbarColorTypes, CardColorTypes } from '@/store/enums';

@Module({
  namespaced: true
})
export default class GlobalModal extends VuexModule {
  selectedNote: Note = {
    id: '',
    title: '',
    content: '',
    color: CardColorTypes.Default
  };
  showNoteDialog = false;
  snackbar: Snackbar = {
    open: false,
    text: '',
    color: SnackbarColorTypes.Success
  };

  @Mutation
  setSelectedNote(note: Note): void {
    this.selectedNote = note;
  }

  @Mutation
  setNoteField(payload: EditNoteField): void {
    this.selectedNote = {
      ...this.selectedNote,
      [payload.name]: payload.value
    };
  }

  @Mutation
  setShowNoteDialog(payload: boolean): void {
    this.showNoteDialog = payload;
  }

  @Mutation
  showSnackbar(payload: Snackbar): void {
    this.snackbar = payload;
  }
}
