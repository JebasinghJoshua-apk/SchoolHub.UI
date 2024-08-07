import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { catchError } from 'rxjs';
import { Configuration } from 'src/app/configuration';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  
  public addStudent: FormGroup;
  public studentName: string;
  public dateOfBirth: string;
  public gender: string;
  public srcResult: any;
  public photoFilePath: string;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              @Inject(MAT_DIALOG_DATA) public data: any
  ){

    console.log(data);
    
  }
  public ngOnInit(): void {
    this.addStudent = this.formBuilder.group({
      studentName: [this.studentName, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      dateOfBirth: [this.dateOfBirth, [Validators.required]],
      gender: [this.gender , [Validators.required]],
      bloodGroup : [],
      fatherName : [],
      motherName: [],
      contactNumber1 : [],
      contactNumber2 : [],
      photoFilePath : [this.photoFilePath]
    });
  }

  onSubmit(formValue : any) {
    console.log(formValue);  
    var addStudentModel = {} as AddStudentModel;
    addStudentModel.studentName = formValue.studentName;
    addStudentModel.dateOfBirth = formValue.dateOfBirth;
    addStudentModel.gender = formValue.gender;
    addStudentModel.photoFilePath = formValue.photoFilePath;
    addStudentModel.fatherName = formValue.fatherName;
    addStudentModel.motherName = formValue.motherName;
    addStudentModel.contactNumber1 = formValue.contactNumber1;
    addStudentModel.contactNumber2 = formValue.contactNumber2;
    addStudentModel.bloodGroup= formValue.bloodGroup;
    addStudentModel.classStandard = this.data.selectedClassStandard 
    addStudentModel.classSection = this.data.selectedClassSection
    var result  = this.http.post<AddStudentModel>(Configuration.api_endpoint + '/student/AddStudent', addStudentModel)
    result.subscribe((response: any) => {
      console.log(response);
    });
    
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };  
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
}


export interface AddStudentModel {
  studentName : string;
  dateOfBirth : string;
  gender : string;
  photoFilePath:  string;
  fatherName : string;
  motherName : string;
  contactNumber1: string;
  contactNumber2 : string;
  bloodGroup : string;
  classStandard : string;
  classSection: string;
}
