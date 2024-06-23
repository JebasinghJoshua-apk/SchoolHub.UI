import { Component } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class StudentListComponent {
  dataSource = [
    {
      name : "Kannan",
      age: "12",
      gender : "Male",
      bloodGroup:"O+",
      photoUrl: "../../assets/images/photos/kannan-photo.jpg"
    },
    {
      name : "Sam",
      age: "12",
      gender : "Male",
      bloodGroup:"A-"
    }
  ]
  
  columnsToDisplay = ['name', 'age', 'gender', 'bloodGroup'];

  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Student | null | undefined;
}

export interface Student {
  name: string;
  age: string;
  gender: string;
  bloodGroup: string;
}