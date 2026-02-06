import { Component } from '@angular/core';
import { DUMMY, Dummy } from '../../dummy';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  dummy: Dummy = DUMMY;

  authors = this.dummy.articles;
}
