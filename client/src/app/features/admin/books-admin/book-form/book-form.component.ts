import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookKey } from 'src/app/core/models/book-key.model';
import { Book } from 'src/app/core/models/book.model';
import { BooksService } from 'src/app/core/services/books.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent implements OnInit, OnChanges {
  @Input() editBookStatus: boolean = false;
  @Input() book?: BookKey;
  @Output() formSubmitEvent = new EventEmitter();
  bookForm: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    author: [''],
    year: [''],
    language: [''],
    pages: [''],
    imageLink: [''],
    link: [''],
    price: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private booksService: BooksService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.editBookStatus) {
      this.bookForm.patchValue({
        title: this.book?.title,
        author: this.book?.author,
        year: this.book?.year,
        language: this.book?.language,
        pages: this.book?.pages,
        imageLink: this.book?.imageLink,
        link: this.book?.link,
        price: this.book?.price,
      });
    }
  }

  onSubmit() {
    if (this.editBookStatus) {
      return this.updateBook();
    }
    return this.createBook();
  }

  createBook() {
    this.booksService
      .createBook(this.bookForm.value)
      .subscribe((_) => this.formSubmitEvent.emit());
  }
  updateBook() {
    this.booksService
      .updateBook(this.book!.key, this.bookForm.value)
      .subscribe((_) => this.formSubmitEvent.emit());
  }

  clearForm() {
    this.bookForm.reset();
    this.editBookStatus = false;
  }
}
