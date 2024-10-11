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
  }, [])

  return(
    <div className="populationChart">
      <div className="title">
        Population over time
      </div>
      <div className="chartContainer">
        <Chart
          chartType="AreaChart" 
          width="100%" 
          height="100%" 
          data={data}
          options={{
            isStacked: true
          }}
        />
      </div>
    </div>
  )
}

export default PopulationChart;