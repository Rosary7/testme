import { EditNoteViewComponent } from './../edit-note-view/edit-note-view.component';
import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../note';
import { MatDialog } from '@angular/material';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  @Input()
  note : Note;
  constructor(public dialog: MatDialog, private router: RouterService) { }

  ngOnInit() {
   // console.log('Note from Parent',this.note);  
  }

  openNoteEdit(){
     this.dialog.open(EditNoteViewComponent,{
     data: this.note
   })
    console.log('noteid=',this.note.noteId);
  // this.router.routeToEditNoteView(this.note.noteId);
  }


}
