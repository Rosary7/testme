import { Category } from './category';
import { Reminder } from './reminder';
export class Note {
noteId: Number;
noteTitle: string;
noteContent: string;
noteStatus: string;
createdAt: Date;
category: Category;
reminder: Reminder;
state: string;
createdBy: string;
//reminders: List<Reminder>;


  constructor() {
  /*  this.title = '';
    this.text = '';
    this.state = 'not-started';
    */

  }
}




