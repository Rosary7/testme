import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { Reminder } from '../reminder';
import { ReminderService } from '../reminder.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent implements OnInit {
  note: Note;
  notes: Array<Note>;
  errMessage: string;
  categoryList: Array<Category>;
  reminderList: Array<Reminder>;
  constructor(private noteService: NotesService, private categoryService: CategoryService, private reminderService: ReminderService, private routerService : RouterService) {
    this.note = new Note();
    this.notes = [];
    this.categoryList = [];
    this.reminderList = [];
    this.note.noteTitle = '';
    this.note.noteContent= '';
    console.log("constructor");
    this.categoryService.getCategory();
    this.reminderService.getReminder();
  }
  ngOnInit() {
    this.noteService.getNotes().subscribe(notesListResponse => {
      this.notes = notesListResponse;
    }, error => {
      if(error.status === 404) {
        //error.error.message =  'Unauthorized';
        this.errMessage=error.message;
      }    });
      this.categoryService.obtainCategory().subscribe(catResponse =>{
        if(catResponse!=null) {
          this.categoryList=catResponse;
          this.categoryList.forEach(category => { 
            console.log("**cat name=",category.categoryName);
          });
        
       }
      });      
      this.reminderService.obtainReminder().subscribe(remResponse =>{
        if(remResponse!=null) {
          this.reminderList=remResponse;
          this.reminderList.forEach(reminder => { 
            console.log("**rem name=",reminder.reminderName);
          });
        
       }
      });       
  }
  takeNote() {
    if (this.note.noteTitle === '' || this.note.noteContent === '') {
      this.errMessage = 'Title and Text both are required fields';
    } else {
    //this.notes.push(this.note);
   // this.noteService.addNote(this.note);
   this.note.noteId=this.notes.length+1;
   console.log("noteid=",this.note.noteId);

   //this.categoryList=this.noteService.categoryList;
   /*this.categoryList.forEach(category => { 
   this.note.category = new Category();
   this.note.category.categoryId=category.categoryId;
   this.note.category.categoryCreatedBy=category.categoryCreatedBy;
   this.note.category.categoryName=category.categoryName;
   console.log("cn=",this.note.category.categoryName,category.categoryName);
   this.note.category.categoryDescription=category.categoryDescription;
   });*/
   
    this.noteService.addNote(this.note).subscribe(addedNote => {}, error => {
      const index = this.notes.findIndex(note => note.noteId === this.note.noteId);
      this.notes.splice(index, 1);
      if(error.status === 404) {
        //error.error.message =  'Unauthorized';
        this.errMessage=error.message;
      }
     // this.note = new Note();      
    });
  }
}
createCategory() {
  this.routerService.routeToCategory();
}
createReminder() {
  this.routerService.routeToReminder();
}
}







  
