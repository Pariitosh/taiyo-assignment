import React, { useState } from 'react';
import { FluctuationChart } from '../components/FluctuationChart';
import { CountryWiseCases } from '../components/CountryWiseCases';


export const ChartsPage: React.FC = () => {
  type DisplayComponent = 'fluctuation' | 'countryWise' | null

  const [displayComponent, setDisplayComponent] = useState<DisplayComponent>(null)

  const handleComponentSelect = (component: DisplayComponent) => {
    setDisplayComponent(component)
  }
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">COVID-19 Dashboard</h1>

      {/* Top section with clickable divs */}
      <div className="flex flex-col gap-4 mb-6 sm:mb-8">
        <div
          className={`p-4 sm:p-6 rounded-lg shadow-md cursor-pointer transition-colors ${displayComponent === 'fluctuation' ? 'bg-red-500 text-white' : 'bg-white hover:bg-blue-100'
            }`}
          onClick={() => handleComponentSelect('fluctuation')}
        >
          <h2 className="text-lg sm:text-xl font-semibold text-center">Cases Fluctuation Graph</h2>
        </div>
        <div
          className={`p-4 sm:p-6 rounded-lg shadow-md cursor-pointer transition-colors ${displayComponent === 'countryWise' ? 'bg-red-500 text-white' : 'bg-white hover:bg-blue-100'
            }`}
          onClick={() => handleComponentSelect('countryWise')}
        >
          <h2 className="text-lg sm:text-xl font-semibold text-center">Country-wise Cases</h2>
        </div>
      </div>

      {/* Display area for selected component */}
      <div className="mt-6 sm:mt-8">
        {displayComponent === 'fluctuation' && <FluctuationChart />}
        {displayComponent === 'countryWise' && <CountryWiseCases />}
        {displayComponent === null && (
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md text-center">
            <p className="text-lg sm:text-xl text-gray-600">Select a chart from above to see it</p>
          </div>
        )}
      </div>
    </div>
  )
}











