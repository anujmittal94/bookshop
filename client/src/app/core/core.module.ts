import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortTitlePipe } from '../shared/pipes/short-title.pipe';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule, MatBadgeModule, RouterModule, MatIconModule],
  exports: [HeaderComponent, FooterComponent],
  providers: [ShortTitlePipe],
})
export class CoreModule {}
