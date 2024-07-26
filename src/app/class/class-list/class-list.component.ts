import { HttpClient } from '@angular/common/http';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Configuration } from 'src/app/configuration';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ClassListComponent {
  dataSource = [] as any;
  columnsToDisplay = ['className', 'section', 'classTeacherName'];
  columnsToDisplayColumnTitle = [
    { key: 'className', displayName: 'Class Name' },
    { key: 'section', displayName: 'Section' },
    { key: 'classTeacherName', displayName: 'Class Teacher Name' }
  ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement:  null | undefined;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.LoadClassList();
  }

  LoadClassList() {
       this.http.get(Configuration.api_endpoint + '/Class/GetClasses/').subscribe(data => {
        this.dataSource = data;
        console.log(this.dataSource);
      });
  }
  

  getColumnHeader(key: string) {
    return this.columnsToDisplayColumnTitle.find(x => x.key == key)?.displayName;
  }



}
