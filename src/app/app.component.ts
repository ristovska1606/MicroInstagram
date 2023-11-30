import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PhotoDetailsComponent } from './photo/photo-details/photo-details.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { SpinnerService } from './photo/photo-list/spinnerService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MicroInstagram';
  showSpinner = false;

  constructor(public dialog: MatDialog,
    private spinnerService: SpinnerService){
  }

}
