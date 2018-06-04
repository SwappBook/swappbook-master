import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiGoogleBooks {

    constructor(
        private http: HttpClient
      ) {}
    
      getBooks(isbn:string) {
        return this.http.get('https://www.googleapis.com/books/v1/volumes?q=isbn:'+ isbn);
      }
}