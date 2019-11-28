import {IAppContext} from 'microfronts/dist/interfaces';
import { Component, OnInit, OnDestroy, NgZone, Input } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ExampleService } from './app-example.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  @Input()
  randomNumber:number|string = 'Waiting for number';

  sub: Subscription;
  emitter: BehaviorSubject<number> = new BehaviorSubject(2);

  constructor( private zone: NgZone, private exampleService: ExampleService) {}

  public handleClick(value: string) {
    if (value === 'LEFT') {
      this.exampleService.notifyLeft();
    } else {
      this.exampleService.notifyRight();
    }
  }

  ngOnInit() {
    this.sub = this.emitter.subscribe((value: number) => {
      this.zone.run(() => {
        this.randomNumber = value.toString();
      });
    });
    (window.AppContext as IAppContext).provide('subject', this.emitter);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
