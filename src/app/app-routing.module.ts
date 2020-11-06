import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsviewComponent } from './detailsview/detailsview.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
{
  path: 'home',
  component: HomepageComponent
},
{
  path: 'detailsview',
  component: DetailsviewComponent
},
{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
},
{
  path: '**',
  redirectTo: 'home',
  pathMatch: 'full'
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
