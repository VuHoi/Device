import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidation } from './form.validator';
@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})  
export class SignupFormComponent {
 form =new FormGroup({
   username: new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(30),
    FormValidation.cannotContainSpace
   ],FormValidation.shouldBeUnique),
   password: new FormControl('', Validators.required)
 })

get username(){

 return  this.form.get('username');
}


get($event){
  console.log($event);
}

}
