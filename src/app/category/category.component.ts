import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NotesService } from '../services/notes.service';
import { RouterService } from '../services/router.service';
import { AuthenticationService } from '../services/authentication.service';
import { CategoryService } from '../category.service';
import { Category } from '../category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public submitMessage: string;
  categoryList: Array<Category>;
  size: number;
  category: Category;
  constructor(private notesService : NotesService, private routerService : RouterService, private categoryService: CategoryService, private authService: AuthenticationService) { 
    this.categoryList = [];
  }
  categoryName = new FormControl('',[Validators.required]);
  categoryDescription = new FormControl('',[Validators.required]);  
  
  addCategory() {
    //this.categoryCreatedBy=this.authService.getUser();
    
    var categoryData = {'categoryName': this.categoryName.value, 'categoryDescription': this.categoryDescription.value, 'categoryCreatedBy': this.authService.getUser()};
    console.log("var_cat=",categoryData);
    this.categoryService.createCategory(categoryData);
      //this.routerService.routeToDashboard();
        
   
  }
 
  goback() {
    this.routerService.routeBack();
  } 

  ngOnInit() {
    

    this.categoryService.obtainCategory().subscribe(catResponse =>{
      if(catResponse!=null) {
        this.categoryList=catResponse;
        this.categoryList.forEach(category => { 
          console.log("**catid=",category.categoryName);
        });
        this.size=this.categoryList.length;
     }
    });   }


}
