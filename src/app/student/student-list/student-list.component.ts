import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AddStudentComponent } from './add-student/add-student.component';
import { Configuration } from 'src/app/configuration';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class StudentListComponent {
  selectedClassStandard = "";
  selectedClassSection = "";

  constructor(private http: HttpClient,
    public dialog: MatDialog) {
  }

  dataSource = [] as any;
  ngOnInit(): void {
    this.LoadClassNames();
  }

  columnsToDisplay = ['name', 'age', 'gender', 'bloodGroup'];
  classNameList = [] as string[];
  sectionNameList = [] as string[];
  columnsToDisplayColumnTitle = [
    { key: 'name', displayName: 'Name' },
    { key: 'age', displayName: 'Age' },
    { key: 'gender', displayName: 'Gender' },
    { key: 'bloodGroup', displayName: 'Blood Group' },
  ];

  getColumnHeader(key: string) {
    return this.columnsToDisplayColumnTitle.find(x => x.key == key)?.displayName;
  }

  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Student | null | undefined;


  openDialog() {
    const dialogRef = this.dialog.open(AddStudentComponent, 
      { data: { selectedClassStandard: this.selectedClassStandard, selectedClassSection: this.selectedClassSection }, 
        width: "650px", 
        height: "700px" 
      });
  }

  classSectionChange(event: any) {
    this.LoadStudentListByClass();
  }

  classStandardChange(event: any) {
    this.dataSource = [];
    this.LoadSection(this.selectedClassStandard);
    //this.LoadStudentListByClass()
  }

  LoadStudentListByClass() {
    if (this.selectedClassStandard != '' && this.selectedClassSection != '') {
      this.http.get(Configuration.api_endpoint + '/student/GetStudentListByClass/' + this.selectedClassStandard + '/' + this.selectedClassSection).subscribe(data => {
        this.dataSource = data
      });
    }
  }
  LoadClassNames(){
    this.http.get<string[]>(Configuration.api_endpoint + '/student/GetClassList').subscribe(classList => {
      this.classNameList=classList;
    });
  }
  LoadSection(className:string){
    this.http.get<string[]>(Configuration.api_endpoint + '/student/GetSectionlistByClass/'+ className).subscribe(section => {
        this.sectionNameList=section;
    });
  }
}

export interface Student {
  name: string;
  age: string;
  gender: string;
  bloodGroup: string;
}