import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { fetchCovidData } from '../thunks/covidHistoryData';
interface CovidCategoryData {
    [date: string]: number; // The date is a string, and the value is a number
  }
  
  // Interface for the main CovidData combining all categories
  interface CovidData {
    cases: CovidCategoryData; // Cases data by date
    deaths: CovidCategoryData; // Deaths data by date
    recovered: CovidCategoryData; // Recovered data by date
  }
  
  // Interface to manage the state of the COVID data fetching process
  interface CovidState {
    data: CovidData; // The data should have a structure as per CovidData
    status: 'idle' | 'loading' | 'succeeded' | 'failed'; // Status of the data fetch
    error: string | null; // Error message if any
  }
  
  // Initial state definition for the CovidState
  const initialState: CovidState = {
    data: {
      cases: {}, // Initialize as an empty object
      deaths: {}, // Initialize as an empty object
      recovered: {}, // Initialize as an empty object
    },
    status: 'idle', // Initial status is 'idle'
    error: null, // No error initially
  };

  const covidSlice = createSlice({
    name: 'covid',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchCovidData.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchCovidData.fulfilled, (state, action: PayloadAction<CovidData>) => {
          state.status = 'succeeded';
          state.data = action.payload;
        })
        .addCase(fetchCovidData.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message || null;
        });
    },
  });

export default covidSlice.reducer;