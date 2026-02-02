import { Component } from '@angular/core';
import { DUMMY, Dummy } from '../../dummy';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  dummy: Dummy = DUMMY;

  authors = this.dummy.articles;
}
