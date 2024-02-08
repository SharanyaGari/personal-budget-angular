import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeroComponent } from './hero/hero.component';
import { FooterComponent } from './footer/footer.component';
import { ArticleComponent } from './article/article.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ContactComponent } from './contact/contact.component';

@Component({
  selector: 'pb-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MenuComponent, HomepageComponent, HeroComponent, FooterComponent,ArticleComponent,BreadcrumbsComponent,ContactComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent {
  title = 'personal-budget';
  @Input() titles = 'Title';
  @Input() content = 'content'
}


