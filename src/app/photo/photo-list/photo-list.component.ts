import { Component, OnInit, ViewChild } from '@angular/core';
import { Photo } from 'src/app/models/photo';
import { PhotoService } from '../photo.service';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { PhotoDetailsComponent } from '../photo-details/photo-details.component';

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

  @ViewChild('menu') menuTrigger!: MatMenuTrigger;


 constructor(private photoService: PhotoService,
            public dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.photoService.getPhotos().subscribe({
      next: photos => {
        this.photos = photos;
        this.photos.slice(0,this.itemsPerPage).map((item: any, i: any) =>{
          this.currentItemsToShow.push(item)
        });
        this.allPages = Math.round(photos.length / this.itemsPerPage);
      }
    })

    
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(PhotoDetailsComponent, {
      width: '600px',
      height: '800px',
      data:{
        'photoId': id
      } 
    });
    console.log(id);
  }

  onPageChange($event: { pageIndex: number; pageSize: number; }) {
    this.currentItemsToShow =  this.photos.slice($event.pageIndex*$event.pageSize,
    $event.pageIndex*$event.pageSize + $event.pageSize);
  }

}
