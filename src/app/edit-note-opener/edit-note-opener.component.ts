import { EditNoteViewComponent } from './../edit-note-view/edit-note-view.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { MatDialog } from '@angular/material';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css']
})
export class EditNoteOpenerComponent implements OnInit {

  noteId : number;
  constructor(private activatedRoute : ActivatedRoute,          
              private dialog : MatDialog) {
    this.activatedRoute.params.subscribe(params =>{
      this.noteId = params.noteId;
    });
      console.log("edit note opener");
     /*this.dialog.open(EditNoteViewComponent,{
       data: this.noteId
     });*/
   }

  ngOnInit() {
  }

}
