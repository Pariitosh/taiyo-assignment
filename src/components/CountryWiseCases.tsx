import { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { Tooltip } from 'react-tooltip';
import axios from 'axios';
import { useQuery } from 'react-query';

interface CountryData {
  country: string;
  cases: number;
  active: number;
  recovered: number;
  deaths: number;
}

interface ProcessedCountryData {
  [key: string]: CountryData;
}

const processData = (data: CountryData[]): ProcessedCountryData => {
  return data.reduce((acc, item) => {
    acc[item.country] = item;
    return acc;
  }, {} as ProcessedCountryData);
};

const fetchData = async (): Promise<CountryData[]> => {
  const response = await axios.get<CountryData[]>('https://disease.sh/v3/covid-19/countries');
  return response.data;
};

export const CountryWiseCases: React.FC = () => {
  const { data, isLoading, error } = useQuery<CountryData[], Error>('covidData', fetchData);
  const [content, setContent] = useState("");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data available</div>;

  const processedData = processData(data);

  const countryData = [
    { name: "USA", coordinates: [-95, 38], data: processedData['USA'] },
    { name: "Brazil", coordinates: [-55, -10], data: processedData['Brazil'] },
    { name: "India", coordinates: [78, 21], data: processedData['India'] },
    { name: "China", coordinates: [105, 35], data: processedData['China'] },
    { name: "Nigeria", coordinates: [8, 10], data: processedData['Nigeria'] },
  ];

  const geoUrl = "map.json";

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ComposableMap projectionConfig={{ scale: 147 }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#EAEAEC"
                stroke="#D6D6DA"
              />
            ))
          }
        </Geographies>
        {countryData.map(({ name, coordinates, data }) => (
          data && (
            <Marker key={name} coordinates={coordinates}>
              <circle
                r={5}
                fill="#F00"
                stroke="#fff"
                strokeWidth={2}
                onMouseEnter={() => {
                  setContent(`${name}, Total cases: ${data.cases}, Active cases: ${data.active}, Recovered Cases: ${data.recovered}, Total Deaths: ${data.deaths}`);
                }}
                onMouseLeave={() => {
                  setContent("");
                }}
                data-tooltip-id="country-tooltip"
              />
            </Marker>
          )
        ))}
      </ComposableMap>
      <Tooltip id="country-tooltip" place="top">
        {content.split(',').map((line, index) => (
          <div key={index}>{line.trim()}</div>
        ))}
      </Tooltip>
    </div>
  );
};