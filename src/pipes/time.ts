import {Injectable, Pipe} from '@angular/core';

@Pipe({
 name: 'timeOfDay'
})
@Injectable()
export class TimeOfDay {
 transform(value, args) {
   var date = new Date(value);
   //console.log(date);
   var time = (date.getUTCHours() % 12) + ":" + date.getUTCMinutes();
   time += (date.getUTCHours() > 12) ? " pm" : " am";
   if (args != undefined && args[0] == 'day') {
     var day_names = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
     console.log(time);
     
     return day_names[date.getUTCDay()] + ", " + time;
   }
   return time;
 }
}