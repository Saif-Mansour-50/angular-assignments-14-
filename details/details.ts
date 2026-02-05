import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DUMMY, Dummy } from '../../dummy';

@Component({
  selector: 'app-details',
  templateUrl: './details.html',
  styleUrl: './details.css',
  imports: [RouterLink],
})
export class Details {
  dummy: Dummy = DUMMY;
  articles = this.dummy.articles;

  article: any;

  sections: {
    title: string;
    content: string[];
  }[] = [];

  constructor(private route: ActivatedRoute) {
    this.getArticleBySlug();
  }

  getArticleBySlug(): void {
    const slug = this.route.snapshot.paramMap.get('slug');

    this.article = this.articles.find((art) => art.slug === slug);

    if (this.article?.content) {
      this.sections = this.parseContent(this.article.content);
    }
  }

  private parseContent(content: string) {
    const blocks = content.split('\n\n');
    const sections: any[] = [];

    let currentSection: any = null;

    for (const block of blocks) {
      if (!block.startsWith('##') && !currentSection) continue;

      if (block.startsWith('##')) {
        if (currentSection) sections.push(currentSection);

        currentSection = {
          title: block.replace('##', '').trim(),
          content: [],
        };
      } else if (currentSection) {
        currentSection.content.push(block.trim());
      }
    }

    if (currentSection) sections.push(currentSection);

    return sections;
  }
}
