import { useParams } from 'react-router-dom';
import BorderCountries from '../../components/borderCountries/BorderCountries';
import PopulationChart from '../../components/populationChart/PopulationChart';
import './countryInfoPage.scss'
import { useEffect, useState } from 'react';
import { getCountryInfo } from '../../services/CountriesService';

function CountryInfoPage() {
  const { code } = useParams();
  const [country, setCountry] = useState();

  useEffect(() => {
    getCountryInfo(code)
    .then((data) => {
      setCountry(data);
    });
  }, [code]);

  return(
    <div className="countryInfoPage">
      { country && (
        <>
          <div className="countryName">
            <h1>{country.commonName}</h1>
            <div className="imageContainer">
              <img src={country.flag} alt="country-flag"/>
            </div>
          </div>
          <div className="boxes">
            <div className="box">
              <BorderCountries countries={country.borders}/>
            </div>
            <div className="box">
              <PopulationChart stats={country.population}/>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CountryInfoPage;