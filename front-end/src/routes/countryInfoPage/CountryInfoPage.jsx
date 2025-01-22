import { useParams } from 'react-router-dom';
import BorderCountries from '../../components/borderCountries/BorderCountries';
import PopulationChart from '../../components/populationChart/PopulationChart';
import './countryInfoPage.scss'
import { useEffect, useState } from 'react';
import { getCountryInfo } from '../../services/CountriesService';
import Loader from '../../components/loader/Loader';

function CountryInfoPage() {
  const { code } = useParams();
  const [country, setCountry] = useState();

  useEffect(() => {
    async function startFetching() {
      const data = await getCountryInfo(code).catch(console.error());
      if (!ignore) {
        setCountry(data);
      }
    };

    let ignore = false;
    startFetching();
    return () => {
      ignore = true;
    };
  }, [code]);

  return(
    <div className="countryInfoPage">
      { country ? (
        <>
          <div className="countryName">
            <h1>{country.commonName}</h1>
            { country.flag &&
              <div className="imageContainer">
                <img src={country.flag} alt="country-flag"/>
              </div>
            }
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
      ): (
        <div className="loaderContainer">
          <Loader/>
        </div>
      )}
    </div>
  )
}

export default CountryInfoPage;