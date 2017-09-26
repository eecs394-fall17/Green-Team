import {Injectable, Pipe} from '@angular/core';
 
@Pipe({
  name: 'timeUntil'
})
@Injectable()
export class TimeUntil {
  transform(value, args) {
    var date = new Date(value);
    console.log(date);
    return date.getHours() + ":" + date.getMinutes();
  }
}