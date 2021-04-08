import { Injectable } from '@angular/core';

@Injectable()
export class NgImageSliderService {
  base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

  isBase64(str: string) {
    return this.base64regex.test(str);
  }

  base64FileExtension(str: string) {
    return str.substring('data:image/'.length, str.indexOf(';base64'));
  }
}
