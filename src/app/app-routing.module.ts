import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StudentListComponent } from './student/student-list/student-list.component';
import { ClassListComponent } from './class/class-list/class-list.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "student-list", component: StudentListComponent },
  { path: "class-list", component: ClassListComponent},
  { path: "**", redirectTo : "home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
