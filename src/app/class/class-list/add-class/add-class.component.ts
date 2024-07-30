import { Component, Inject } from '@angular/core';
import { Configuration } from 'src/app/configuration';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent {

  public addClass: FormGroup;
  public className: string;
  public section: string;
  public classTeacherId: number;
  public englishTeacherId: number;
  public mathsTeacherId: number;
  public scienceTeacherId: number

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient
 ){

    
  }

  public ngOnInit(): void {
    this.addClass = this.formBuilder.group({
      className: "" ,
      section: "",
      classTeacherId: "",
      englishTeacherId : "",
      mathsTeacherId : "",
      scienceTeacherId: "",
    });
  }

  onSubmit(formValue : any) {
    console.log(formValue);  
    var addClassModel = {} as AddClassComponent;
    addClassModel.className = formValue.className;
    addClassModel.section = formValue.section;
    addClassModel.classTeacherId = formValue.classTeacherId;
    addClassModel.englishTeacherId = formValue.englishTeacherId;
    addClassModel.mathsTeacherId = formValue.mathsTeacherId;
    addClassModel.scienceTeacherId = formValue.scienceTeacherId;
    var result  = this.http.post<AddClassComponent>(Configuration.api_endpoint + '/class/AddClass', addClassModel)
    result.subscribe((response: any) => {
      console.log(response);
    });
    
  }
}


export interface AddClassModel {
  className : string;
  section : string;
  classTeacherId : number;
  englishTeacherId:  number;
  mathsTeacherId : number;
  scienceTeacherId : number;
}
