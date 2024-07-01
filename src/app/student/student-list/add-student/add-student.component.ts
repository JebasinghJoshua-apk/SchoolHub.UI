import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  public addStudent: FormGroup;
  public studentName: string;
  constructor(private formBuilder: FormBuilder){
    
  }
  public ngOnInit(): void {
    this.addStudent = this.formBuilder.group({
      IdProof: null,
      studentName: [this.studentName, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
    });
  }

  submit(){
    
  }
}
