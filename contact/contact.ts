import { Article } from './../article';
import { Component } from '@angular/core';
import { DUMMY, Dummy } from '../../dummy';
import { FormsModule } from '@angular/forms';

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

  searchTerm: string = '';

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
    this.displayedFilterResult = this.filterArticle.slice(index * 6, index * 6 + 6);
  }

  viewMode: 'grid' | 'list' = 'grid';

  toggleV(mode: 'grid' | 'list') {
    this.viewMode = mode;
  }

  searchArticles() {
    let result = this.dummy.articles;

    // 🔹 search in excerpt only
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();

      result = result.filter((art) => art.excerpt.toLowerCase().includes(term));
    }

    this.filterArticle = result;
    this.displayedFilterResult = result.slice(0, 6);
    this.pageSetup();
  }
}
