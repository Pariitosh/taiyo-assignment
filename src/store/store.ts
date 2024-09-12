import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from '../features/slices/contactSlice';
import covidDataSlice from '../features/slices/covidDataSlice';

const store = configureStore({
    reducer: {
      contacts: contactsReducer,
      covid:covidDataSlice
    },
  });

  
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
