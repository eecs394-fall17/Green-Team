import {Injectable, Pipe} from '@angular/core';

@Pipe({
 name: 'timeOfDay'
})
@Injectable()
export class TimeOfDay {
  transform(value, args) {
    var date = new Date(value);
    //console.log(date);

    var time = (date.getUTCHours() % 12) + ":";
    var minutes = date.getUTCMinutes();
    if (minutes < 10) {
      time += "0";
    }
    time += minutes;
    time += (date.getUTCHours() > 12) ? " pm" : " am";
    
    if (args == undefined) {
      return time;
    }

    var day_names = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    var month_names = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    if (args[0] == 'day') {
      console.log(time);
       
      return day_names[date.getUTCDay()] + ", " + time;
    } else if (args[0] == 'dayDate') {
      return day_names[date.getUTCDay()] + ", " + month_names[date.getUTCMonth()] + " " + date.getUTCDate().toString();
    }
    return time;
  }
}