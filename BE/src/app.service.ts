import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Country, CountryInfo, CountryPopulation, Flag, Population, CountryFlag } from './types';

@Injectable()
export class AppService {
  /**
   * Get all countries available
   * @returns List of available countries (name and code ISO 3166-1 alpha-2 format)
   */
  async getCountries() {
    try {
      const countries = await fetch('https://date.nager.at/api/v3/AvailableCountries', {
        method: 'GET',
        headers: new Headers({ 'Content-type': 'application/json' }),
        mode: 'cors'
      })
  
      return countries.json();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Get country info
   * @param iso3 Country code ISO 3166-1 alpha-3 format
   * @returns An object containing country's common name, official name, code, region and borders countries
   */
  async getCountryInfo( iso3: string ): Promise<CountryInfo> {
    try {
      const response = await fetch(`https://date.nager.at/api/v3/CountryInfo/${iso3}`, {
        method: 'GET',
        headers: new Headers({ 'Content-type': 'application/json' }),
        mode: 'cors'
      });
  
      const info: CountryInfo = await response.json();
      return info;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Get population over time of one country
   * @param iso3 Country code ISO 3166-1 alpha-3 format
   * @returns An array of objects containing year and population for said year
   */
  async getCountryPopulation( iso3: string ): Promise<Population> {
    try {
      const response = await fetch('https://countriesnow.space/api/v0.1/countries/population', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({iso3: iso3}),
        mode: 'cors'
      });
  
      const population: CountryPopulation = await response.json();
      return population.data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Get flag of one country
   * @param iso2 Country code ISO 3166-1 alpha-2 format
   * @returns A URL of the flag image
   */
  async getCountryFlag( iso2: string ): Promise<Flag> {
    try {
      const response = await fetch('https://countriesnow.space/api/v0.1/countries/flag/images', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({iso2: iso2}),
        mode: 'cors'
      });
  
      const flag: CountryFlag = await response.json();
      return flag.data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Gets country info (same as method getCountryInfo) plus the country's flag and population over time
   * @param iso2 Country code ISO 3166-1 alpha-2 format
   * @returns An object containing country's common name, official name, code, region, borders countries, flag's image and population over time
   */
  async getCountry(iso2: string): Promise<Country> {
    try {
      const retrievedFlag: Flag = await this.getCountryFlag(iso2);
      const { iso3, flag } = retrievedFlag;
  
      const info: CountryInfo = await this.getCountryInfo(iso3);
  
      const population: Population = await this.getCountryPopulation(iso3);
      const { populationCounts } = population;

      const country: Country = {
        iso3: iso3,
        flag: flag,
        population: populationCounts,
        commonName: info.commonName,
        officialName: info.officialName,
        countryCode: info.countryCode,
        region: info.region,
        borders: info.borders
      }

      return country;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
