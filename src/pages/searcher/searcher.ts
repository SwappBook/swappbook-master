import { ProductListService } from './../../service/product-list.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductWithImage } from '../../models/product';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the SearcherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-searcher',
  templateUrl: 'searcher.html',
})
export class SearcherPage {

  tabBarElement: any;

  prodList: Observable<ProductWithImage[]>;
  generalList:Array<ProductWithImage> = [];
  FilterList:Array<ProductWithImage> = [];
  
  cat = '';
  checkItems = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private db: AngularFireDatabase,
              private product:ProductListService) {
                this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  ionViewDidLoad() {
    this.initializeItems();
    this.tabBarElement.style.display = 'none'
  }

  ionViewWillLeave() {
    this.initializeItems();
    this.tabBarElement.style.display = 'flex';
  }

  initializeItems(): void {
    this.prodList = this.product.getProductList()
    .snapshotChanges()
    .map(
      changes => {
        return changes.map(
          c => ({
            key: c.payload.key, ... c.payload.val()
          })
        )
      }
    );

    this.prodList.forEach(element => {
      element.forEach(res => {
        this.generalList.push(res)
      });
    });

    this.igualarArrays();
  }

  igualarArrays(){
    this.FilterList = this.generalList;
  }

  getItems(searchbar) {
  
    // set q to the value of the searchbar
    var q = searchbar.target.value;
  
  
    // if the value is an empty string don't filter the items
    if (!q) {
      this.igualarArrays();
      return;
    }

    this.FilterList = this.FilterList.filter((v) => {
      if(v.titulo && q) {
        if (v.titulo.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  getItemsAutor(searchbar) {
  
    // set q to the value of the searchbar
    var q = searchbar.target.value;
  
  
    // if the value is an empty string don't filter the items
    if (!q) {
      this.igualarArrays();
      return;
    }

    this.FilterList = this.FilterList.filter((v) => {
      if(v.autor && q) {
        if (v.autor.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  optionsFn(){
    var q = this.cat;

    this.FilterList = this.FilterList.filter((v) => {
      if(v.categoria && q) {
        if (v.categoria.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  check(){
    if (this.FilterList.length < 0){
      this.initializeItems();
      console.log('vacio')
    }

    this.FilterList = this.FilterList.filter((v) => {
      if(v.accion && this.checkItems) {
        if (v.accion.toLowerCase().indexOf(this.checkItems.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  buscar(){
    this.FilterList.forEach(element => {
      console.log(element.descripcion)
    });  
  }

  clear(){
    this.igualarArrays();
  }
}
