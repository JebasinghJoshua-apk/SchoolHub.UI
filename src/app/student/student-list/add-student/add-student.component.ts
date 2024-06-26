import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  form: FormGroup | undefined;
  constructor(private formBuilder: FormBuilder){
    
  }
  submit(){
    
  }
}
