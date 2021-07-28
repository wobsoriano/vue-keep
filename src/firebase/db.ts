import { db } from './firebase';
import { collection, doc, updateDoc, getDocs, addDoc, deleteDoc } from 'firebase/firestore/lite';
import { Note, NewNote } from '@/store/types';

export const createNote = async (note: NewNote): Promise<Note> => {
  const newDoc = await addDoc(collection(db, 'notes'), note);
  return {
    id: newDoc.id,
    ...note
  };
};

export const getNotes = async (): Promise<Note[]> => {
  const querySnapshot = await getDocs(collection(db, 'notes'));
  return querySnapshot.docs.map(doc => {
    const { title, content, color } = doc.data();
    return {
      id: doc.id,
      title,
      content,
      color
    };
  });
};

export const updateNote = async (note: Note): Promise<Note> => {
  const noteRef = doc(db, 'notes', note.id);
  await updateDoc(noteRef, {
    title: note.title,
    content: note.content,
    color: note.color
  });
  return note;
};

export const deleteNote = async (id: string): Promise<string> => {
  const noteRef = doc(db, 'notes', id);
  await deleteDoc(noteRef);
  return id;
};
