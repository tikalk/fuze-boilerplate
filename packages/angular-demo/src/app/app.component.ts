import {IAppContext} from 'microfronts/dist/interfaces';
import { Component, OnInit, OnDestroy, NgZone, Input } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  @Input()
  title = 'angular-demo';

  sub: Subscription;
  emitter: BehaviorSubject<number> = new BehaviorSubject(2);

  constructor( private zone: NgZone) {}

  ngOnInit() {
    this.sub = this.emitter.subscribe((value: number) => {
      this.zone.run(() => {
        this.title = value.toString();
      });
    });
    (window.AppContext as IAppContext).provide('subject', this.emitter);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
