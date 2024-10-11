import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { isISO31661Alpha2 } from 'class-validator';

@Controller('countries')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getCountries(): Promise<any> {
    return this.appService.getCountries();
  }

  @Get(':iso2')
  getCountry(@Param('iso2') iso2: string): Promise<any> {
    if(!isISO31661Alpha2(iso2)){
      throw new HttpException('Country code should be a ISO 3166-1 alpha-2 valid code', HttpStatus.BAD_REQUEST);
    }
    return this.appService.getCountry(iso2);
  }
}
