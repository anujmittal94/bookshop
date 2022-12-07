import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

import { NgxPaginationModule } from 'ngx-pagination';
import { BookSearchPipe } from './pipes/book-search.pipe';

const modules = [
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  NgxPaginationModule,
];

const material = [MatIconModule, MatBadgeModule];

const pipes = [BookSearchPipe];

@NgModule({
  declarations: [BookSearchPipe],
  imports: [CommonModule],
  exports: [...modules, ...material, ...pipes],
})
export class SharedModule {}
