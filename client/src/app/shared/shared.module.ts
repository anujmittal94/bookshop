import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { NgxPaginationModule } from 'ngx-pagination';

import { BookSearchPipe } from './pipes/book-search.pipe';
import { ShortTitlePipe } from './pipes/short-title.pipe';
import { DefaultPipe } from './pipes/default.pipe';

const modules = [
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  NgxPaginationModule,
];

const material = [MatIconModule, MatBadgeModule, MatProgressSpinnerModule];

const pipes = [BookSearchPipe, ShortTitlePipe, DefaultPipe];

@NgModule({
  declarations: [BookSearchPipe, ShortTitlePipe, DefaultPipe],
  imports: [CommonModule],
  exports: [...modules, ...material, ...pipes],
})
export class SharedModule {}
