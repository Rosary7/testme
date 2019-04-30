import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { Note } from '../note'

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit {

  notes: Array<Note>;
  errMessage: string;
  note : Note;
  
  constructor(private notesService: NotesService) {

    //this.note.title = '';
    //this.note.text = '';

  }
  ngOnInit() {
    this.note = new Note();
    this.notes = [];    
    this.notesService.getNotes().subscribe(notesListResponse => {
      this.notes = notesListResponse;
      this.notesService.notesData = this.notes;
    }, error => {
      if(error.status === 404) {
        //error.error.message =  'Unauthorized';
        this.errMessage=error.message;
      }    });
  }  

  onSelectedOption(e) {
    this.getFilteredExpenseList();
  }

  getFilteredExpenseList() {
    if (this.notesService.searchOption.length > 0)
      this.notes = this.notesService.filteredListOptions();
    else {
      this.notes = this.notesService.notesData;
    }

    console.log("search result",this.notes) ;
  }
}
