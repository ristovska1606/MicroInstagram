import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PhotoService } from '../photo.service';
import { Photo } from 'src/app/models/photo';


@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})

export class PhotoDetailsComponent implements OnInit {
  private photoId!: number;
  photo?: Photo;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private photoService: PhotoService,
              public dialog: MatDialog) {
      this.photoId = data['photoId'];
  }

  ngOnInit(): void {
    this.photoService.getPhotoById(this.photoId)
    .subscribe({
      next: p => this.photo=p
    });
  }

  delete(): void {
    if (!this.photo || !this.photo.id) {
      // Don't delete, it was never saved.
      console.log("The photo was deleted.")
    } else {
      if (confirm(`Really delete the photo: ${this.photo.id}?`)) {
        this.photoService.deletePhoto(this.photo.id).subscribe({
          next: () => {console.log(`${this.photo?.id} was deleted`)
          this.dialog.closeAll()
        }
        });
      }
    }
  }

}
