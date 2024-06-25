import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StudentListComponent } from './student/student-list/student-list.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "student-list", component: StudentListComponent },
  { path: "**", redirectTo : "home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
