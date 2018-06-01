import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class apiAmazonService {

    constructor(
        private http: HttpClient
      ) {}
    
      getBooks() {
        return this.http.get('http://webservices.amazon.com/onca/xml?Service=AWSECommerceService&AWSAccessKeyId='+ 'AKIAI5H3S6FZJFWS4MDQ' +'&AssociateTag='+ 'swappbooles-21' +'&Operation=ItemLookup&SearchIndex=Books&IdType=ASIN&ItemId=B072YZSRVQ')
      }
}