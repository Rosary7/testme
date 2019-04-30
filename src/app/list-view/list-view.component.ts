import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  notStartedNotes: Array<Note>;
  startedNotes: Array<Note>;
  completedNotes: Array<Note>;

  notes: Array<Note>;
  errMessage: string;
  note : Note;

  constructor(private notesService: NotesService) {

    //this.note.title = '';
    //this.note.text = '';
  }
  ngOnInit() {
    this.notesService.getNotes().subscribe(notesListResponse => {
      this.note = new Note();
      this.notes = [];
      this.notStartedNotes = [];
      this.startedNotes = [];
      this.completedNotes = [];
      this.notes = notesListResponse;
      console.log('subject',notesListResponse);
      notesListResponse.forEach(note => {
        if(note.state === 'not-started') this.notStartedNotes.push(note);
        else if(note.state === 'started') this.startedNotes.push(note);
        else this.completedNotes.push(note);
      })
    }, error => {
      if(error.status === 404) {
        //error.error.message =  'Unauthorized';
        this.errMessage=error.message;
      }
      //this.errMessage = error.message;
    });
  }    
}
