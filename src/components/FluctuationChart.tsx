import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios'
import { LineChart } from '@mui/x-charts/LineChart';


const isMobile=window.innerWidth<768

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


export const FluctuationChart:React.FC=()=>{
  const fetchData = async (): Promise<CovidData> => {
    const response = await axios.get<CovidData>('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
    return response.data;
};
    const { data, isLoading, error } = useQuery<CovidData, Error>('myData', fetchData);
    const years = [2020, 2021, 2022, 2023, 2024];
  const caseCounts = [
    data?.cases['1/22/20'],
    data?.cases['1/1/21'],
    data?.cases['1/1/22'],
    data?.cases['1/1/23'],
    data?.cases['3/9/23']
  ].map(count => Number(count) || 0);

  const maxCount = Math.max(...caseCounts);
  const yAxisMax = Math.ceil(maxCount / 10) * 10;
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return (
        <div className='flex justify-center w-100'>
        <LineChart
        xAxis={[{
            data: years,
            label: 'Year',
            valueFormatter: (value) => value.toString(),
            tickNumber: years.length - 1,
            tickLabelStyle: {
              angle: 0,
              textAnchor: 'middle',
            },
          }]}
      yAxis={[{
        
        min: 0,
        max: yAxisMax,
        valueFormatter: (value) => {
          if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
          if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
          return value.toString();
        },
      }]}
      series={[
        {
          data: caseCounts,
          label: 'COVID-19 Cases',
          valueFormatter: (value) => value.toLocaleString(),
        },
      ]}
      width={isMobile?500:700}
      height={isMobile?400:500}
      tooltip={{ trigger: 'axis' }}
    />
    </div>
    )

}










