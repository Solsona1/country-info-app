import './borderCountries.scss'

function BorderCountries({ countries }) {
  return(
    <div className="borderCountries">
      <table>
        <thead className="tableHeader">
          <tr><th>Border Countries</th></tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <tr key={country.countryCode}>
              <td className="countryContainer">
                <a className="countryName" href={`/info/${country.countryCode}`}>
                  {country.commonName}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BorderCountries;