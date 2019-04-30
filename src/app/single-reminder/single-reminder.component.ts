import { Component, OnInit, Input} from '@angular/core';
import { Reminder } from  '../reminder';
import { ReminderService } from '../reminder.service';
import { NotesService } from '../services/notes.service';
import { Note } from '../note'
@Component({
  selector: 'app-single-reminder',
  templateUrl: './single-reminder.component.html',
  styleUrls: ['./single-reminder.component.css']
})
export class SingleReminderComponent implements OnInit {
  @Input()
  reminder : Reminder;

  notes: Array<Note>;
  errMessage: string;
 // note : Note;
 constructor(private reminderService : ReminderService, private notesService : NotesService ) { }

  ngOnInit() {
    console.log('Reminder from Parent',this.reminder);
    this.notes = [];   
    this.notesService.getNotes().subscribe(notesListResponse => {
      this.notes = notesListResponse;
      console.log("notes size=",this.notes.length);
    }, error => {});
  } 

  update() {
    this.reminderService.updateReminder(this.reminder);
    //this.note = new Note();
   // const note = this.notes.find(notetemp => notetemp.reminder.reminderId == this.reminder.reminderId);
   let notetemp: Note;
   for (let i=0; i< this.notes.length; i++) {
    if(this.notes[i].reminder!=null) {
      if(this.notes[i].reminder.reminderId == this.reminder.reminderId) {
        const note = this.notes[i];
      Object.assign({}, note);
      note.reminder=this.reminder;
      this.notesService.editNote(note);
      }
    }
   }
     
  }   


  delete() {
    this.reminderService.deleteReminder(this.reminder);
    let notetemp: Note;
    for (let i=0; i< this.notes.length; i++) {
     if(this.notes[i].reminder!=null) {
       if(this.notes[i].reminder.reminderId == this.reminder.reminderId) {
         const note = this.notes[i];
       Object.assign({}, note);
       note.reminder=null;
       this.notesService.editNote(note);
       }
     }
    }
  }
  /*openNoteEdit(){
    // this.dialog.open(EditNoteViewComponent,{
    //   data: this.note
    // })

    this.router.routeToEditView(this.note.id);

  }*/
}
