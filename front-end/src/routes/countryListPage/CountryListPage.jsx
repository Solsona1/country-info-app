import { Link } from 'react-router-dom';
import './countryListPage.scss'
import { useEffect, useState } from 'react';
import { getAvailableCountries } from '../../services/CountriesService';

function CountryListPage() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getAvailableCountries()
    .then((data) => {
      setCountries(data);
    });
  }, [])

  return(
    <div className="countryListPage">  
      {
        countries.map((country) => (
          <div className="countryCard" key={country.countryCode}>
            <Link to={`info/${country.countryCode}`}>
              {country.name}
            </Link>
          </div>
        ))
      }
    </div>
  )
}

export default CountryListPage;