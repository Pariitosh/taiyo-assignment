import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Contact {
  firstName: string;
  lastName: string;
  status: 'active' | 'inactive';
}

interface ContactsState {
  contacts: Contact[];
}

const initialState: ContactsState = {
  contacts: [
    
  ],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
    },
    deleteContact: (state, action: PayloadAction<number>) => {
      state.contacts.splice(action.payload, 1);
    },
    editContact: (state, action: PayloadAction<{ index: number; contact: Contact }>) => {
      const { index, contact } = action.payload;
      if (index >= 0 && index < state.contacts.length) {
        state.contacts[index] = contact;
      }
    },
  },
});

export const { addContact, deleteContact, editContact } = contactsSlice.actions;
export default contactsSlice.reducer;
