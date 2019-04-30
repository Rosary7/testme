import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NotesService } from '../services/notes.service';
import { RouterService } from '../services/router.service';
import { AuthenticationService } from '../services/authentication.service';
import { ReminderService } from '../reminder.service';
import { Reminder } from '../reminder';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {
  public submitMessage: string;
  reminderList: Array<Reminder>;
  size: number;
  reminder: Reminder;
  constructor(private notesService : NotesService, private routerService : RouterService, private reminderService: ReminderService, private authService: AuthenticationService) { 
    this.reminderList = [];
  }
  reminderName = new FormControl('',[Validators.required]);
  reminderDescription = new FormControl('',[Validators.required]);  
  reminderType = new FormControl('',[Validators.required]); 
  
  addReminder() {
    //this.reminderCreatedBy=this.authService.getUser();
    
    var reminderData = {'reminderName': this.reminderName.value, 'reminderDescription': this.reminderDescription.value, 'reminderType': this.reminderType.value, 'reminderCreatedBy': this.authService.getUser()};
    console.log("var_rem=",reminderData);
    this.reminderService.createReminder(reminderData);
      //this.routerService.routeToDashboard();
        
   
  }
 
  ngOnInit() {
    

    this.reminderService.obtainReminder().subscribe(remResponse =>{
      if(remResponse!=null) {
        this.reminderList=remResponse;
        this.reminderList.forEach(reminder => { 
          console.log("**remid=",reminder.reminderName);
        });
        this.size=this.reminderList.length;
     }
    });   }

    back() {
      this.routerService.routeBack();
    }    

}
