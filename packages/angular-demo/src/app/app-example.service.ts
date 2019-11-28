import { Injectable } from '@angular/core';
import { IAppContext } from 'microfronts/dist/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ExampleService {
  private appContext: IAppContext = window.AppContext;

  private subject = new BehaviorSubject<'LEFT'|'RIGHT'|'NOT YET CLICKED'>('NOT YET CLICKED');

  constructor() {
    this.appContext.provide('click.service', this.subject);
  }

  public notifyLeft() {
    this.subject.next('LEFT');
  }

  public notifyRight() {
    this.subject.next('RIGHT');
  }
}
