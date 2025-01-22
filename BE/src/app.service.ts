import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  Country,
  CountryInfo,
  CountryPopulation,
  Flag,
  Population,
  CountryFlag,
} from './types';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { instanceToPlain, plainToInstance } from 'class-transformer';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  /**
   * Get all countries available
   * @returns List of available countries (name and code ISO 3166-1 alpha-2 format)
   */
  async getCountries() {
    try {
      const countries = await fetch(
        'https://date.nager.at/api/v3/AvailableCountries',
        {
          method: 'GET',
          headers: new Headers({ 'Content-type': 'application/json' }),
          mode: 'cors',
        },
      );

      if (!countries.ok) {
        return null;
      }

      return await countries.json();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Get country info
   * @param iso2 Country code ISO 3166-1 alpha-2 format
   * @returns An object containing country's common name, official name, code, region and borders countries
   */
  async getCountryInfo(iso2: string): Promise<CountryInfo | null> {
    try {
      const response = await fetch(
        `https://date.nager.at/api/v3/CountryInfo/${iso2}`,
        {
          method: 'GET',
          headers: new Headers({ 'Content-type': 'application/json' }),
          mode: 'cors',
        },
      );

      if (!response.ok) {
        return null;
      }

      return (await response.json()) as CountryInfo;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Get population over time of one country
   * @param iso3 Country code ISO 3166-1 alpha-3 format
   * @returns An array of objects containing year and population for said year
   */
  async getCountryPopulation(iso3: string): Promise<Population | null> {
    try {
      const response = await fetch(
        'https://countriesnow.space/api/v0.1/countries/population',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ iso3: iso3 }),
          mode: 'cors',
        },
      );

      if (!response.ok) {
        return null;
      }

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
  async getCountryFlag(iso2: string): Promise<Flag | null> {
    try {
      const response = await fetch(
        'https://countriesnow.space/api/v0.1/countries/flag/images',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ iso2: iso2 }),
          mode: 'cors',
        },
      );

      if (!response.ok) {
        return null;
      }

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
  async getCountry(iso2: string): Promise<Country | null> {
    try {
      const cachedCountry = await this.cacheManager.get(iso2);

      if (cachedCountry != null) {
        return plainToInstance(Country, cachedCountry);
      } else {
        const info: CountryInfo = await this.getCountryInfo(iso2);
        if (info != null) {
          const retrievedFlag: Flag = await this.getCountryFlag(iso2);

          if (retrievedFlag != null) {
            const { iso3, flag } = retrievedFlag;

            const population: Population = await this.getCountryPopulation(
              iso3,
            );

            if (population != null) {
              const { populationCounts } = population;

              const country: Country = {
                iso3: iso3,
                flag: flag,
                population: populationCounts,
                commonName: info.commonName,
                officialName: info.officialName,
                countryCode: info.countryCode,
                region: info.region,
                borders: info.borders,
              };

              await this.cacheManager.set(iso2, instanceToPlain(country));
              return country;
            } else {
              const country: Country = {
                iso3: iso3,
                flag: flag,
                population: [],
                commonName: info.commonName,
                officialName: info.officialName,
                countryCode: info.countryCode,
                region: info.region,
                borders: info.borders,
              };

              await this.cacheManager.set(iso2, instanceToPlain(country));
              return country;
            }
          } else {
            const country: Country = {
              iso3: '',
              flag: '',
              population: [],
              commonName: info.commonName,
              officialName: info.officialName,
              countryCode: info.countryCode,
              region: info.region,
              borders: info.borders,
            };

            await this.cacheManager.set(iso2, instanceToPlain(country));
            return country;
          }
        } else {
          return null;
        }
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
