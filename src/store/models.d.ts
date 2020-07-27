import { SnackbarColorTypes } from './enums';

export interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
}

export interface NewNote {
  title: string;
  content: string;
  color: string;
}

export interface Snackbar {
  open: boolean;
  text: string;
  color: SnackbarColorTypes;
}

export interface EditNoteField {
  name: string;
  value: string;
}
