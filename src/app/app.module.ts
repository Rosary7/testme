import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { HeaderComponent } from './header/header.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule, MatSidenavModule, MatListModule, MatSelectModule, MatAutocomplete } from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NotesService } from './services/notes.service';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule, MatChipsModule} from '@angular/material';
//for routing
import  { RouterModule, Routes } from '@angular/router'
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { ListViewComponent } from './list-view/list-view.component';
import { NoteComponent } from './note/note.component';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';
import { RegisterComponent } from './register/register.component';
import { CategoryComponent } from './category/category.component';
import { CategoryService } from './category.service';
import { SingleCategoryComponent } from './single-category/single-category.component';
import { ReminderService } from './reminder.service';
import { ReminderComponent } from './reminder/reminder.component';
import { SingleReminderComponent } from './single-reminder/single-reminder.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

const routes : Routes = [

  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate:[CanActivateRouteGuard],
    children :[
      {
        path:'view/noteview',
        component: NoteViewComponent
      },
      {
        path: 'view/listview',
        component: ListViewComponent
      },
      {
        path:'note/:noteId/edit',component:EditNoteOpenerComponent,
        outlet:'noteEditOutlet'
      },
      {
        path:'',
        redirectTo:'view/noteview',
        pathMatch:'full'
      }

    ]
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  }, 
  {
    path:'category',
    component:CategoryComponent
  },  
  {
    path:'reminder',
    component:ReminderComponent
  },     
  {
    path:'',redirectTo:'login',pathMatch:'full'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    NoteTakerComponent,
    NoteViewComponent,
    ListViewComponent,
    NoteComponent,
    EditNoteViewComponent,
    EditNoteOpenerComponent,
    RegisterComponent,
    CategoryComponent,
    SingleCategoryComponent,
    ReminderComponent,
    SingleReminderComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatChipsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [CanActivateRouteGuard, AuthenticationService, RouterService, NotesService, CategoryService, ReminderService],
  bootstrap: [AppComponent],
  entryComponents:[EditNoteViewComponent]
})
export class AppModule { }
