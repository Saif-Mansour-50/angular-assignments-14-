import { Article } from './../article';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component } from '@angular/core';

import { Dummy, DUMMY } from '../../dummy';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  dummy: Dummy = DUMMY;

  article: any;

  specialArticles = this.dummy.articles.filter((art) => art.featured);

  latestArticlesList = this.dummy.articles
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  constructor(private router: Router) {}

  goToDetails(slug: string): void {
    this.router.navigate(['/details', slug]);
  }
}
