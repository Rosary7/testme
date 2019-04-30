
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { NotesService } from '../services/notes.service';
import { Note } from '../note';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit {
  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;

 

  /*constructor(
    public dialogRef: MatDialogRef<EditNoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    public notesService: NotesService, private routerService: RouterService) {
    this.note = new Note();  
    console.log('note data inside editnoteview', data);
    this.note = this.notesService.getNoteById(data);
    console.log('note for edit', this.note);


  }*/
  constructor(
    public dialogRef: MatDialogRef<EditNoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public notesService: NotesService, private routerService: RouterService) {
    this.note = new Note();  
    console.log('note data inside editnoteview', data);
    this.note = data;
    //this.note = this.notesService.getNoteById(data);
    console.log('note for edit', this.note);
    window.location.reload();

  }

  ngOnInit() {
  }

  onSave() {
  
    this.notesService.editNote(this.note).subscribe(res => {
      console.log('returned note service',res);
    },
    error=>{
      console.log(error);
      if(error.status === 404) {
        //error.error.message =  'Unauthorized';
        this.errMessage=error.message;
      }
    });

    this.dialogRef.close();
    this.dialogRef.afterClosed().subscribe(res =>{
      //this.routerService.routeBack();
   },
   error=>{
     console.log(error);
     this.errMessage = error.message;
   });
  }



  delete() {
    console.log("delete");
    this.notesService.deleteNote(this.note);
    this.dialogRef.close();
  }  
}




