import { Component } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { MatDialog} from '@angular/material/dialog';
import { AddStudentComponent } from './add-student/add-student.component';

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
  
  constructor(private http: HttpClient,
              public dialog: MatDialog){
  }

  dataSource = [] as any;
  ngOnInit(): void {
    this.http.get('https://localhost:44386/student/GetStudentListByClass/5/A').subscribe(data => {
      this.dataSource = data
    });
  }
 
  columnsToDisplay = ['name', 'age', 'gender', 'bloodGroup'];

  columnsToDisplayColumnTitle = [
    {key: 'name', displayName: 'Name'}, 
    {key: 'age', displayName: 'Age'}, 
    {key: 'gender', displayName: 'Gender'}, 
    {key: 'bloodGroup', displayName: 'Blood Group'},
  ];

  getColumnHeader(key:string){
   return this.columnsToDisplayColumnTitle.find(x=>x.key == key)?.displayName;
  }

  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Student | null | undefined;


  openDialog() {
    const dialogRef = this.dialog.open(AddStudentComponent, {width : "620px", height: "420px"});
  }
}

export interface Student {
  name: string;
  age: string;
  gender: string;
  bloodGroup: string;
}