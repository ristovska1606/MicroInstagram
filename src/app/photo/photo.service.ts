import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, last, map, of, tap } from "rxjs";
import { Photo } from "../models/photo";


@Injectable({
    providedIn:'root'
}) 

export class PhotoService{
    private photoUrl = 'https://jsonplaceholder.typicode.com/photos';

    constructor(private http: HttpClient){

    }

    getPhotos(): Observable<Photo[]>{
        return this.http.get<Photo[]>(this.photoUrl)
        .pipe(
            tap(data => console.log(JSON.stringify(data)))
        );
    }

    getPhotosLimited(start: number, limit: number): Observable<Photo[]>{
      const url = `${this.photoUrl}?_start=${start}&_limit=${limit}`;
      return this.http.get<Photo[]>(url)
      .pipe(
          tap(data => console.log(JSON.stringify(data)))
      );
  }

    getPhotoById(id: number): Observable<Photo>{
        if(id === 0){
            return of(this.initializePhoto());
        }
        const url = `${this.photoUrl}/${id}`;
        return this.http.get<Photo>(url)
        .pipe(
            tap(data => console.log(JSON.stringify(data)))
        )
    }

    private initializePhoto(): Photo {
        // Return an initialized object
        return {
          id: 0,
          albumId: 0,
          title: '',
          url: '',
          thumbnailUrl: ''
        };
      }

    createPhoto(newPhoto: Photo): Observable<Photo>{
       console.log('Creating new photo!')
       const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
       return this.http.post<Photo>(this.photoUrl, newPhoto, {headers})
       .pipe(
        tap(data => console.log('createProduct: ' + JSON.stringify(data))),
      );
    }

    updatePhoto(updatedPhoto : Photo) : Observable<Photo>{
        console.log('Updating photo!')
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.photoUrl}/${updatedPhoto.id}`;
        return this.http.put<Photo>(url, updatedPhoto, { headers })
        .pipe(
            tap(() => console.log('updateProduct: ' + updatedPhoto.id)),
        // Return the product on an update
            map(() => updatedPhoto)
      );
    }

    deletePhoto(id: number): Observable<{}> {
        console.log('Deleting photo!')
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.photoUrl}/${id}`;
        return this.http.delete<Photo>(url, { headers })
          .pipe(
            tap(data => console.log('deletePhoto: ' + id)),
          );
      }

}


