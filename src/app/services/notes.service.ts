import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Note } from '../note';

import { AuthenticationService } from '../services/authentication.service';
import { tap } from 'rxjs/operators';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
@Injectable()
export class NotesService {
  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;
  searchOption=[];
  public notesData: Note[];
  //categoryList: Array<Category>;
  constructor(private httpClient : HttpClient,private authService: AuthenticationService) {
    this.notes = [];
    //this.categoryList=[];
    this.notesSubject = new BehaviorSubject([]);
    console.log('inside NoteSErvice');
    //this.fetchNotesFromServer();
   }  
  fetchNotesFromServer() {
    console.log("service user=",this.authService.getUser());
    this.notesSubject = new BehaviorSubject([]);
    return this.httpClient.get<Array<Note>>('http://localhost:8082/api/v1/note/'+`${this.authService.getUser()}`,{
      headers: new HttpHeaders().set('Authorization',`Bearer ${this.authService.getBearerToken()}`)
    }).subscribe(notesResponse =>{
      if(notesResponse!=null) {
      this.notes = notesResponse;
      this.notesData = this.notes;
      this.notesSubject.next(this.notes);
      } else {
        this.notesSubject = new BehaviorSubject([]);
      }
    })
  }

  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;
  }


  addNote(note: Note): Observable<Note> {
    note.createdBy=this.authService.getUser();
    let Observable = this.httpClient.post<Note>('http://localhost:8082/api/v1/note',note,{
      headers: new HttpHeaders().set('Authorization',`Bearer ${this.authService.getBearerToken()}`)
    });
    console.log('store in db');
    Observable.subscribe(addedNote =>{
      this.notes.push(addedNote);
      this.notesSubject.next(this.notes);
    })
    return Observable;
    
    /*.flatMap(
    .tap(addedNote =>{
        this.notes.push(addedNote);
        this.notesSubject.next(this.notes);
      })*/
    
  }

  editNote(note: Note): Observable<Note> {
    console.log("nc=",note.createdBy);
   let Observable =  this.httpClient.put<Note>(`http://localhost:8082/api/v1/note/${note.createdBy}/${note.noteId}`,note,{
    headers: new HttpHeaders().set('Authorization',`Bearer ${this.authService.getBearerToken()}`)
  });
    Observable.subscribe(editedNote =>{
      const note = this.notes.find(note => note.noteId == editedNote.noteId);
      console.log('note before assign',note);
      //Object.assign(note,editedNote);
      console.log('note after assign',note);
      Object.assign({}, note);
      this.notesSubject.next(this.notes);
    })
    return Observable;
  }

  deleteNote(inote: Note) : Observable<any> {
    let Observable =  this.httpClient.delete(`http://localhost:8082/api/v1/note/${inote.createdBy}/${inote.noteId}`,{
      headers: new HttpHeaders().set('Authorization',`Bearer ${this.authService.getBearerToken()}`)
    });  
    const index = this.notes.findIndex(note => note.noteId === inote.noteId);
    console.log("index=",index);
    this.notes.splice(index, 1);
    this.notesSubject.next(this.notes);
    Observable.subscribe(Message =>{ console.log(Message);

    }, error=>{
      console.log(error)})   ;
    return Observable;

    //const index = this.notes.findIndex(note => note.noteId === this.notes.find(note).noteId);
  //  this.notes.splice(index, 1);   

  }

getNoteById(noteId: number): Note {
  //console.log('found note',this.notes.find(note => note.id == noteId));

    return this.notes.find(note => note.noteId == noteId);
  }
  /*  getNoteById(noteId: number): Note {

  const note = this.notes.find(noteValue => noteValue.id === noteId);
  console.log('found note',this.notes.find(noteValue => noteValue.id === noteId));
     return Object.assign({}, note); }
     //return this.notes.find(note => note.id == noteId); }*/

     filteredListOptions() {
      let notes = this.notesData;
          let filteredNotesList = [];
          for (let note of notes) {
              for (let options of this.searchOption) {
                  if (options.noteTitle === note.noteTitle) {
                    filteredNotesList.push(note);
                  }
              }
          }
          console.log(filteredNotesList);
          return filteredNotesList;
    }
}
