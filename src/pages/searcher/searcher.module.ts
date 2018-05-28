import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearcherPage } from './searcher';

@NgModule({
  declarations: [
    SearcherPage,
  ],
  imports: [
    IonicPageModule.forChild(SearcherPage),
  ],
})
export class SearcherPageModule {}
