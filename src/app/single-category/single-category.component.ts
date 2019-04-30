import { Component, OnInit, Input} from '@angular/core';
import { Category } from  '../category';
import { CategoryService } from '../category.service';
import { NotesService } from '../services/notes.service';
import { Note } from '../note'
@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})
export class SingleCategoryComponent implements OnInit {
  @Input()
  category : Category;

  notes: Array<Note>;
  errMessage: string;
 // note : Note;
 constructor(private categoryService : CategoryService, private notesService : NotesService ) { }

  ngOnInit() {
    console.log('Category from Parent',this.category);
    this.notes = [];   
    this.notesService.getNotes().subscribe(notesListResponse => {
      this.notes = notesListResponse;
      console.log("notes size=",this.notes.length);
    }, error => {});
  } 

  update() {
    this.categoryService.updateCategory(this.category);
    //this.note = new Note();
   // const note = this.notes.find(notetemp => notetemp.category.categoryId == this.category.categoryId);
   let notetemp: Note;
   for (let i=0; i< this.notes.length; i++) {
    if(this.notes[i].category!=null) {
      if(this.notes[i].category.categoryId == this.category.categoryId) {
        const note = this.notes[i];
      Object.assign({}, note);
      note.category=this.category;
      this.notesService.editNote(note);
      }
    }
   }
     
  }   


  delete() {
    this.categoryService.deleteCategory(this.category);
    let notetemp: Note;
    for (let i=0; i< this.notes.length; i++) {
     if(this.notes[i].category!=null) {
       if(this.notes[i].category.categoryId == this.category.categoryId) {
         const note = this.notes[i];
       Object.assign({}, note);
       note.category=null;
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
