import { NgModule } from '@angular/core';
import { MatInputModule, MatCardModule , MatButtonModule ,
  MatToolbarModule ,
  MatExpansionModule,
  MatPaginatorModule,
  MatDialogModule,
  MatProgressSpinnerModule} from '@angular/material';
@NgModule({
  exports: [
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
  ]
})

export class AngularMaterialModule { }
