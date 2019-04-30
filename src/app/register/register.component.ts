import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public submitMessage: string;
  constructor(private authService : AuthenticationService, private routerService : RouterService) { 
  }
  username = new FormControl('',[Validators.required]);
  firstName = new FormControl('',[Validators.required]);
  lastName = new FormControl('',[Validators.required]);  
  password = new FormControl('',[Validators.required]);
  userRole = new FormControl('',[Validators.required]);
  
  register() {
    var userdata = {'userId': this.username.value, 'firstName': this.firstName.value, 'lastName': this.lastName.value, 'userPassword': this.password.value, 'userRole': this.userRole.value};
    this.authService.registerUser(userdata).subscribe(data=>{
     // this.authService.setBearerToken(data["token"]);
      console.log('data',data);
      this.routerService.routeToLogin();
    },
    error=>{
      if(error.status === 409) {
        error.error.message =  'conflict';
        this.submitMessage=error.error.message;
      }
      if(error.status === 404) {
        //error.error.message =  'Unauthorized';
        this.submitMessage=error.message;
      }        
    }
    )      
  }


  ngOnInit() {
  }

}
