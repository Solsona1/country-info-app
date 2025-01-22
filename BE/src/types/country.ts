import { YearPopulation } from './population';

export class CountryInfo {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: CountryInfo[] | null;
}

export class Country extends CountryInfo {
  iso3: string;
  flag: string;
  population: YearPopulation[];
}
