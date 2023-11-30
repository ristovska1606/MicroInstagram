import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Photo } from 'src/app/models/photo';
import { PhotoService } from '../photo.service';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { PhotoDetailsComponent } from '../photo-details/photo-details.component';
import { Router, Event, NavigationEnd, NavigationStart, NavigationError, NavigationCancel } from '@angular/router';
import { SpinnerService } from './spinnerService.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {
  photos: any = [];
  currentItemsToShow: any[] = []
  itemsPerPage: number = 30;
  allPages?: number;
  loading?: boolean;
  start:number=0;
  photosLength: number = 5000;
  page:number = 0;

 constructor(private photoService: PhotoService,
            public dialog: MatDialog,
            private router: Router) { 
              router.events.subscribe((routerEvent: Event) => {
                this.checkRouterEvent(routerEvent);
              });
             }

checkRouterEvent(routerEvent: Event): void {
              if (routerEvent instanceof NavigationStart) {
                this.loading = true;
              }
          
              if (routerEvent instanceof NavigationEnd ||
                  routerEvent instanceof NavigationCancel ||
                  routerEvent instanceof NavigationError) {
                  this.loading = false;
              }
            }           
 
  
  ngOnInit(): void {
   this.loading = true;

    this.photoService.getPhotosLimited(this.start,this.itemsPerPage).subscribe({
      next: photos => {
        this.currentItemsToShow = photos;  
        if(this.currentItemsToShow)
          this.loading=false;
      }
    })
    this.allPages = Math.round(this.photosLength / this.itemsPerPage); 
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(PhotoDetailsComponent, {
      maxWidth: '600px',
      maxHeight: '750px',
      data:{
        'photoId': id
      } 
    });
    console.log(id);
  }

  onPageChange($event: { pageIndex: number; pageSize: number; }) {

   this.loading = true; 
   this.currentItemsToShow=[]
   this.photoService.getPhotosLimited($event.pageIndex*$event.pageSize, $event.pageSize).subscribe({
      next: photos => {
        this.currentItemsToShow = photos; 
        if(this.currentItemsToShow)
          this.loading=false;  
      }
     })  

  }

}
