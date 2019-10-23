import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService implements OnInit {
  public isLoading: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  ngOnInit(): void { 
  }
}
