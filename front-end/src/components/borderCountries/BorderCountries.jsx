import './borderCountries.scss'
import { Link } from 'react-router-dom';

function BorderCountries({ countries }) {
  return(
    <div className="borderCountries">
      <table>
        <thead className="tableHeader">
          <tr><th>Border Countries</th></tr>
        </thead>
        <tbody>
          {countries.length!=0 ? countries.map((country) => (
            <tr key={country.countryCode}>
              <td className="countryContainer">
                <Link className="countryName" to={`/info/${country.countryCode}`} reloadDocument>
                  {country.commonName}
                </Link>
              </td>
            </tr>
          )): (
            <tr>
              <td className="noBorders">
                This country does not have border countries
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default BorderCountries;