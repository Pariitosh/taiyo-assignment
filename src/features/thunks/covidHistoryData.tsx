import { createAsyncThunk } from '@reduxjs/toolkit';

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

export const fetchCovidData = createAsyncThunk<CovidData>(
    'covid/fetchData',
    async () => {
      // Fetch data and return it in the CovidData format
      const response = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
      const data: CovidData = await response.json();
      return data;
    }
  );