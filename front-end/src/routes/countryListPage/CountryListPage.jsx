import { Link, useLoaderData } from 'react-router-dom';
import './countryListPage.scss'
import { getAvailableCountries } from '../../services/CountriesService';
import Loader from '../../components/loader/Loader';

function CountryListPage() {
  const countries = useLoaderData();

  return(
    <div className="countryListPage">  
      {
        countries.length!=0 ?
        countries.map((country) => (
          <div className="countryCard" key={country.countryCode}>
            <Link to={`info/${country.countryCode}`}>
              {country.name}
            </Link>
          </div>
        )) 
        : (
          <div className="loaderContainer">
            <Loader/>
          </div>
        )
      }
    </div>
  )
}

export default CountryListPage;

export async function countriesLoader() {
  try {
    const data = await getAvailableCountries();
    return data;
  } catch (error) {
    console.error(error.name);
    console.error(error.message);
    return [];
  }
}