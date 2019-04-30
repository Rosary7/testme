import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Reminder } from './reminder';
import { AuthenticationService } from './services/authentication.service';
import { ReminderComponent } from './reminder/reminder.component';

@Injectable()
export class ReminderService {
  notesSubject: BehaviorSubject<Array<Reminder>>;
  reminderList: Array<Reminder>;
  constructor(private httpClient : HttpClient,private authService: AuthenticationService) {
    this.reminderList=[];
    console.log('inside ReminderService');
    this.notesSubject = new BehaviorSubject([]);
    
    //this.fetchReminderFromServer();
   }  

   createReminder(data): Observable<Reminder> {
    console.log("rem data=",data);
    let Observable = this.httpClient.post<Reminder>('http://localhost:8081/api/v1/reminder',data,{
      headers: new HttpHeaders().set('Authorization',`Bearer ${this.authService.getBearerToken()}`)
    });
    Observable.subscribe(addedReminder =>{
      this.reminderList.push(addedReminder);
      this.notesSubject.next(this.reminderList);
      
    })
    return Observable;
  }
  getReminder() : Observable<any> {
    console.log("user=",this.authService.getUser());
    let Observable =  this.httpClient.get<Array<Reminder>>('http://localhost:8081/api/v1/reminderall/'+`${this.authService.getUser()}`,{
      headers: new HttpHeaders().set('Authorization',`Bearer ${this.authService.getBearerToken()}`)
    });
    Observable.subscribe(remResponse =>{
      if(remResponse!=null) {
        this.reminderList=remResponse;
        this.notesSubject.next(this.reminderList);
        this.reminderList.forEach(reminder => { 
          console.log("remname=",reminder.reminderName);
        });
      
     }
    });
    return Observable;
  }     

  obtainReminder(): BehaviorSubject<Array<Reminder>> {
    return this.notesSubject;
  }

  updateReminder(reminder: Reminder) : Observable<any> {
    console.log("user=",this.authService.getUser());
    let Observable =  this.httpClient.put<Reminder>('http://localhost:8081/api/v1/reminder/'+`${reminder.reminderId}`,reminder, {
      headers: new HttpHeaders().set('Authorization',`Bearer ${this.authService.getBearerToken()}`)
    });
    Observable.subscribe(remResponse =>{
      if(remResponse!=null) {
        const remg = this.reminderList.find(rem => rem.reminderId == reminder.reminderId);
        console.log('remg before assign',remg);
        //Object.assign(note,editedNote);
        console.log('remg after assign',remg);
        Object.assign({}, remg);
        this.notesSubject.next(this.reminderList);
          
     }
    });
    return Observable;
  }   

  deleteReminder(reminder: Reminder) : Observable<any> {
    let Observable =  this.httpClient.delete('http://localhost:8081/api/v1/reminder/'+`${reminder.reminderId}`,{
      headers: new HttpHeaders().set('Authorization',`Bearer ${this.authService.getBearerToken()}`)
    });
    const index = this.reminderList.findIndex(rem => rem.reminderId === reminder.reminderId);
    console.log("index=",index);
    this.reminderList.splice(index, 1);
    this.notesSubject.next(this.reminderList);
    Observable.subscribe(Message =>{ console.log(Message);
    }, error=>{
      console.log(error)})   ;
    return Observable;

    //const index = this.notes.findIndex(note => note.noteId === this.notes.find(note).noteId);
  //  this.notes.splice(index, 1);   

  }  
}
