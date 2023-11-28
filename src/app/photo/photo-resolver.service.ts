import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, catchError, map, of } from "rxjs";
import { PhotoService } from "./photo.service";
import { PhotoResolved } from "../models/photo";

@Injectable({
    providedIn: 'root'
})

export class PhotoResolver implements Resolve<PhotoResolved>{

    constructor(private photoService: PhotoService){

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<PhotoResolved> {
        const id = route.paramMap.get('id')
        if(isNaN(Number(id))){
            const message = `Photo id was not a number: ${id}`;
            console.log(message);
            return of({photo: null, error:message});
        }

        return this.photoService.getPhotoById(Number(id))
        .pipe(
            map(photo => ({photo:photo})),
            catchError( error => {
                const message = `Retrieval error ${error}`;
                console.log(error);
                return of({photo:null, error: message});
            })
        );
    }
}