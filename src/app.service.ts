import { I18nService } from './i18n/i18n.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly I18nService: I18nService){}

  getHello(): string {
    return this.I18nService.translate('HELLO', { firstName : 'Zaheer'});
  }
}
