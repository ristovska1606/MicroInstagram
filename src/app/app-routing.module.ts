import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';

import { PageNotFoundComponent } from "./page-not-found.component";
import { PhotoDetailsComponent } from "./photo/photo-details/photo-details.component";
import { PhotoListComponent } from "./photo/photo-list/photo-list.component";
import { PhotoAddComponent } from "./photo/photo-add/photo-add.component";
import { PhotoResolver } from "./photo/photo-resolver.service";


@NgModule({
    imports: [
        RouterModule.forRoot([
          { path: 'photos', component: PhotoListComponent},
          { path: 'photos/:id/details', component: PhotoDetailsComponent},
          { path: 'photos/:id/edit', component: PhotoAddComponent, 
            resolve: {resolvedData: PhotoResolver}},
          { path: '', redirectTo: 'photos', pathMatch:'full' }, //default path
          { path: '**', component: PageNotFoundComponent } //if the path dont match anything from the paths
          
        ])
    ],
      exports: [RouterModule]
})

export class AppRoutingModule{

}