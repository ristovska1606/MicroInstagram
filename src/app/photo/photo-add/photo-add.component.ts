import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { PhotoService } from '../photo.service';
import { Photo, PhotoResolved } from 'src/app/models/photo';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-photo-add',
  templateUrl: './photo-add.component.html',
  styleUrls: ['./photo-add.component.css']
})
export class PhotoAddComponent implements OnInit {
[x: string]: any;

  cardTitle?: string;
  photoForm!: FormGroup;
  private currentPhoto: Photo | null=null; 
  private originalPhoto: Photo | null=null; 

  constructor(private formBuilder: FormBuilder,
    private photoService: PhotoService,
    private route:ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
    ) { }

    get photo(): Photo | null {
      return this.currentPhoto;
    }
    set photo(value: Photo | null) {
      this.currentPhoto = value;
      // Clone the object to retain a copy
      this.originalPhoto = value ? { ...value } : null;
    }

  ngOnInit(): void {
    this.dialog.closeAll();
    this.route.data.subscribe(data => {
      const resolvedData: PhotoResolved = data['resolvedData'];
      this.photo = resolvedData.photo;
      if (!this.currentPhoto) {
          this.cardTitle = 'Add Product';
      } else {
          this.cardTitle = `Edit Product: ${this.currentPhoto.id}`;
      };
      
    })

    this.photoForm = new FormGroup({
      id: new FormControl(this.photo ? this.photo.id : "",Validators.required),
      albumId: new FormControl(this.photo ? this.photo.albumId : "",Validators.required),
      title: new FormControl(this.photo ? this.photo.title : "",Validators.required),
      url: new FormControl(this.photo ? this.photo.url : "",Validators.required),
      thumbnailUrl: new FormControl(this.photo ? this.photo.thumbnailUrl : "",Validators.required)
    })


  }

  save( ){
    console.log(this.photoForm.value);
    if(this.photo){
      if (this.photo.id!==0) {
        this.photoService.updatePhoto(this.photo).subscribe({
          next: () => (`The updated ${this.currentPhoto?.title} was saved`)
        });
        
      } 
      else {
        this.photoService.createPhoto(this.photo).subscribe({
          next: () => console.log(`The new ${this.photo?.title} was saved`)
        });
      }
    }

    this.photoForm.reset();
    
  }


  close(){
    if (confirm(`Navigate away and lose all changes?`))
        this.router.navigate(['/photos']);

  }

 
}
