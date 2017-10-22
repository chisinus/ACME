import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule} from '@angular/forms';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { ProductListComponent } from './product-list.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-space.pipe';
import { ProductDetailComponent } from './product-detail.component';
import { ProductDetailGuard, ProductEditGuard } from './product-guard.service';
// import { HttpProductService } from '../services/http.product.service';
// import { HttpProductService } from './http.product.service';
import { HttpProductService } from '../services/http.product.service';
import { SharedModule } from './../shared/shared.module';
import { ProductEditComponent } from './product-edit.component';
import { ProductData } from './product-data';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      { path: 'products/:id', canActivate: [ProductDetailGuard], component: ProductDetailComponent },
      { path: 'productEdit/:id', canDeactivate: [ProductEditGuard], component: ProductEditComponent }
    ]),
    SharedModule,
    ReactiveFormsModule,
    // InMemoryWebApiModule.forRoot(ProductData)
  ],
  declarations: [
    ProductListComponent,
    ProductEditComponent,
    ConvertToSpacesPipe,
    ProductDetailComponent
  ],
  providers: [ProductDetailGuard, ProductEditGuard, HttpProductService, HttpProductService]
})
export class ProductModule { }
