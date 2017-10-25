import {Injectable, Pipe} from '@angular/core';

@Pipe({
 name: 'timeOfDay'
})
@Injectable()
export class TimeOfDay {
  transform(value, args) {
    var date = new Date(value);
    //console.log(date);

    var hours = (date.getHours() % 12);
    if (hours == 0)
      hours = 12;

    var time = hours + ":";
    var minutes = date.getMinutes();
    if (minutes < 10) {
      time += "0";
    }
    time += minutes;
    time += (date.getHours() > 11) ? " pm" : " am";
    //durell did this ^^^
    if (args == undefined) {
      return time;
    }

    var day_names = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    var month_names = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    if (args[0] == 'day') {
      console.log(time);
       
      return day_names[date.getDay()] + ", " + time;
    } else if (args[0] == 'dayDate') {
      return day_names[date.getDay()] + ", " + month_names[date.getMonth()] + " " + date.getDate().toString();
    }
    return time;
  }
}
