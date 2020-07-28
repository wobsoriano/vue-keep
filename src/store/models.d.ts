import { SnackbarColorTypes } from './enums';

export interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
}

export type NewNote = Omit<Note, 'id'>;

export interface Snackbar {
  open: boolean;
  text: string;
  color: SnackbarColorTypes;
}

export interface EditNoteField {
  name: string;
  value: string;
}
