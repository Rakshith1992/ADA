import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './shared/components/error-page/error-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/mainview', pathMatch: 'full'},
  { path: 'error', component: ErrorPageComponent},
  { path: '**', component: ErrorPageComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
