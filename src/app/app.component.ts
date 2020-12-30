import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { from, of, Subject, interval } from 'rxjs';
import { merge } from 'rxjs/index';
import { buffer, map, filter, throttleTime, delay } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Timer';

  interval;
  time = new Date(null);

  startTimer(){
    this.interval = setInterval(() => {
      this.time.setSeconds(this.time.getSeconds() + 1);
    }, 1000);

  }

  stopTimer(){
    clearInterval(this.interval);
    this.time.setSeconds(0);
  }

  pauseTimer(){
    clearInterval(this.interval);
  }

  resetTimer(){
    this.time.setSeconds(0);
  }

    text = '';
    obs = new Subject();
    constructor() {
    }

    ngOnInit() {
      const clickStream = this.obs.asObservable();
      const dly = 300;

      const multiClickStream = clickStream.pipe(
          buffer(clickStream.pipe(throttleTime(dly))),
          map(list => list.length),
          filter(x => x >= 2)
      );

      multiClickStream.subscribe((numclicks) => this.text = ''+ numclicks +'x click');

      multiClickStream
          .pipe(delay(1000))
          .subscribe(() => this.text = '');
  }

}

