import { Component, OnInit, ViewChild, ElementRef,EventEmitter,Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { NotesService } from '../services/notes.service';
import { Note } from '../note';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  allNotes: Note[];
  autoCompleteList: any[]

  @ViewChild('autocompleteInput') autocompleteInput: ElementRef;
  @Output() onSelectedOption = new EventEmitter();

  constructor(
    private notesService: NotesService
  ) { }

  ngOnInit() {
    this.notesService.getNotes().subscribe(notes => {
      this.allNotes = notes

    });

    this.myControl.valueChanges.subscribe(userInput => {
      this.autoCompleteExpenseList(userInput);
    })
  }

  private autoCompleteExpenseList(input) {
    let categoryList = this.filterCategoryList(input)
    this.autoCompleteList = categoryList;
  }

  filterCategoryList(val) {
    var categoryList = []
    if (typeof val != "string") {
      return [];
    }
    if (val === '' || val === null) {
      return [];
    }
    return val ? this.allNotes.filter(s => s.noteTitle.toLowerCase().indexOf(val.toLowerCase()) != -1)
      : this.allNotes;
  }

  displayFn(note: Note) {
    let k = note ? note.noteTitle : note;
    return k;
  }

  filterNoteList(event) {
    var notes= event.source.value;
        if(!notes) {
          this.notesService.searchOption=[]
        }
        else {
          console.log("not")

            this.notesService.searchOption.push(notes);
            this.onSelectedOption.emit(this.notesService.searchOption)
        }
        
        this.focusOnPlaceInput();

       
        
  }


  removeOption(option) {
        
    let index = this.notesService.searchOption.indexOf(option);
    if (index >= 0)
        this.notesService.searchOption.splice(index, 1);
        this.focusOnPlaceInput();

        this.onSelectedOption.emit(this.notesService.searchOption)
}

focusOnPlaceInput() {
  this.autocompleteInput.nativeElement.focus();
  this.autocompleteInput.nativeElement.value = '';
}


}