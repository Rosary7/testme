import { Component } from '@angular/core';
import { RouterService } from '../services/router.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isNoteView = true;
  constructor(private routerService : RouterService) {

  }


  changeToListView() {
    this.isNoteView = false;
    this.routerService.routeToListView();
  }

  changeToNoteView() {
    this.isNoteView = true;
    this.routerService.routeToNoteView();
  }  

  logout() {
    this.routerService.routeToLogin();
  }


}
