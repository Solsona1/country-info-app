export class YearPopulation {
  year: number;
  value: number;
}

export class Population {
  country: string;
  code: string;
  iso3: string;
  populationCounts: YearPopulation[];
}

export class CountryPopulation {
  error: string;
  msg: string;
  data: Population;
}
