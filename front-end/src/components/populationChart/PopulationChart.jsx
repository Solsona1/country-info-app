import { useEffect, useState } from 'react';
import './populationChart.scss'
import Chart from 'react-google-charts'

function PopulationChart({ stats }) {
  const [data, setData] = useState([[]]);

  useEffect(() => {
    let aux = [["Year", "Population"]];
    stats.map((population) => (
      aux.push([population.year, population.value])
    ));
    setData(aux);
  }, [stats]);

  return(
    <div className="populationChart">
      <div className="title">
        Population over time
      </div>
      <div className="chartContainer">
        { data.length>1 ? (
          <Chart
            chartType="AreaChart" 
            width="100%" 
            height="100%" 
            data={data}
            options={{
              isStacked: true
            }}
          />
          ): (
            <div className="noPopulation">
              This country has no population data
            </div>
          )
        }
      </div>
    </div>
  )
}

export default PopulationChart;