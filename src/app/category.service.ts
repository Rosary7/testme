import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Category } from './category';
import { AuthenticationService } from './services/authentication.service';
import { CategoryComponent } from './category/category.component';

@Injectable()
export class CategoryService {
  notesSubject: BehaviorSubject<Array<Category>>;
  categoryList: Array<Category>;
  constructor(private httpClient : HttpClient,private authService: AuthenticationService) {
    this.categoryList=[];
    console.log('inside CategoryService');
    this.notesSubject = new BehaviorSubject([]);
    
    //this.fetchCategoryFromServer();
   }  

   createCategory(data): Observable<Category> {
    console.log("cat data=",data);
    let Observable = this.httpClient.post<Category>('http://localhost:8083/api/v1/category',data,{
      headers: new HttpHeaders().set('Authorization',`Bearer ${this.authService.getBearerToken()}`)
    });
    Observable.subscribe(addedCategory =>{
      this.categoryList.push(addedCategory);
      this.notesSubject.next(this.categoryList);
      
    })
    return Observable;
  }
  getCategory() : Observable<any> {
    console.log("user=",this.authService.getUser());
    let Observable =  this.httpClient.get<Array<Category>>('http://localhost:8083/api/v1/categoryall/'+`${this.authService.getUser()}`,{
      headers: new HttpHeaders().set('Authorization',`Bearer ${this.authService.getBearerToken()}`)
    });
    Observable.subscribe(catResponse =>{
      if(catResponse!=null) {
        this.categoryList=catResponse;
        this.notesSubject.next(this.categoryList);
        this.categoryList.forEach(category => { 
          console.log("catname=",category.categoryName);
        });
      
     }
    });
    return Observable;
  }     

  obtainCategory(): BehaviorSubject<Array<Category>> {
    return this.notesSubject;
  }

  updateCategory(category: Category) : Observable<any> {
    console.log("user=",this.authService.getUser());
    let Observable =  this.httpClient.put<Category>('http://localhost:8083/api/v1/category/'+`${category.categoryId}`,category, {
      headers: new HttpHeaders().set('Authorization',`Bearer ${this.authService.getBearerToken()}`)
    });
    Observable.subscribe(catResponse =>{
      if(catResponse!=null) {
        const catg = this.categoryList.find(cat => cat.categoryId == category.categoryId);
        console.log('catg before assign',catg);
        //Object.assign(note,editedNote);
        console.log('catg after assign',catg);
        Object.assign({}, catg);
        this.notesSubject.next(this.categoryList);
          
     }
    });
    return Observable;
  }   

  deleteCategory(category: Category) : Observable<any> {
    let Observable =  this.httpClient.delete('http://localhost:8083/api/v1/category/'+`${category.categoryId}`,{
      headers: new HttpHeaders().set('Authorization',`Bearer ${this.authService.getBearerToken()}`)
    });
    const index = this.categoryList.findIndex(cat => cat.categoryId === category.categoryId);
    console.log("index=",index);
    this.categoryList.splice(index, 1);
    this.notesSubject.next(this.categoryList);
    Observable.subscribe(Message =>{ console.log(Message);
    }, error=>{
      console.log(error)})   ;
    return Observable;

    //const index = this.notes.findIndex(note => note.noteId === this.notes.find(note).noteId);
  //  this.notes.splice(index, 1);   

  }  
}
