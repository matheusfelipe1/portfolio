import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialpageComponent } from './views/initialpage/initialpage.component';

const routes: Routes = [
  { path: "", component: InitialpageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
