import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
// import { Product } from './product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public loadedProducts = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.fetchProducts()
      .subscribe(data => this.loadedProducts = data);
  }

}

