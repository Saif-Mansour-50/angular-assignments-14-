import { routes } from './../../app.routes';
import { Article } from './../article';
import { Component } from '@angular/core';
import { DUMMY, Dummy } from '../../dummy';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface FilterButton {
  label: string;
  value: string;
}

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  dummy: Dummy = DUMMY;

  activeCategory: string = '';

  searchTerm: string = '';

  artivale: any;

  currentPage = 0;

  filterArticle: Article[] = this.dummy.articles.slice();

  displayedFilterResult: Article[] = this.dummy.articles.slice(0, 6);
  categoryFilterButtons: FilterButton[] = [
    { label: 'جميع المقالات', value: '' },
    { label: ' إضاءة', value: 'إضاءة' },
    { label: ' بورتريه', value: 'بورتريه' },
    { label: ' مناظر طبيعية', value: 'مناظر طبيعية' },
    { label: ' تقنيات', value: 'تقنيات' },
    { label: ' معدات', value: 'معدات' },
  ];

  flag = true;

  pagesNumber: number[] = Array(Math.ceil(this.filterArticle.length / 6));

  filterArticles = (filter: string) => {
    if (filter === '') {
      this.filterArticle = this.dummy.articles;
      this.displayedFilterResult = this.filterArticle.slice(0, 6);

      this.pageSetup();
      return;
    }

    let result = this.dummy.articles.filter((art) => art.category.includes(filter));

    this.filterArticle = result;
    this.displayedFilterResult = result.slice(0, 6);
    this.pageSetup();
  };

  pageSetup() {
    if (this.filterArticle.length > 6) {
      this.flag = true;
      this.pagesNumber = Array(Math.ceil(this.filterArticle.length / 6));
    } else {
      this.flag = false;
    }
  }

  pages(index: number) {
    this.currentPage = index;
    this.displayedFilterResult = this.filterArticle.slice(index * 6, index * 6 + 6);
  }

  viewMode: 'grid' | 'list' = 'grid';

  toggleV(mode: 'grid' | 'list') {
    this.viewMode = mode;
  }

  searchArticles() {
    let result = this.dummy.articles;

    if (this.searchTerm.trim()) {
      let search = this.searchTerm;

      result = result.filter((S) => S.excerpt.includes(search) || S.title.includes(search));
    }

    this.filterArticle = result;
    this.displayedFilterResult = result.slice(0, 6);
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  goToDetails(slug: string): void {
    this.router.navigate(['/details', slug]);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      let category = params['category'];

      if (category) {
        this.activeCategory = category;
        this.filterArticles(category);
      } else {
        this.filterArticles('');
        this.activeCategory = '';
      }
    });
  }
}
