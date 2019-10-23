import { Component, OnInit } from '@angular/core';
import { LoadingScreenService } from 'src/app/shared/services/loading-screen.service';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss']
})
export class LoadingScreenComponent implements OnInit {
  isLoading: boolean = false;

  constructor(
    private loadingScreenService: LoadingScreenService
  ) { }

  ngOnInit() {
    this.loadingScreenService.isLoading.subscribe(r => {
      this.isLoading = r;
    });
  }
}
