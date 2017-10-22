import { OnInit, OnDestroy, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NumberValidators } from '../shared/number-validation';
import { IProduct } from './product';
// import { HttpProductService } from '../services/http.product.service';
// import { HttpProductService } from './http.product.service';
import { HttpProductService } from '../services/http.product.service';

@Component ({
    templateUrl: './product-edit.component.html'
})

export class ProductEditComponent implements OnInit, OnDestroy {
    errorMessage: any;
    productForm: FormGroup;
    product: IProduct;
    pageTitle: string;
    sub: any;

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private productService: HttpProductService) {
    }

    ngOnInit(): void {
        this.productForm = this.fb.group({
             productName: ['', [Validators.required,
                               Validators.min(3),
                               Validators.max(50)]],
             productCode: ['', Validators.required],
             starRating: ['', NumberValidators.range(1, 5)],
             // tags: this.fb.array([]),
             description: ''
        });

        // when only need to get the initial value
        // let id = +this.route.snapshot.params['id'];

        // expect paramter to change without leaving the page
        // use observable
        this.sub = this.route.params.subscribe(
            params => {
                const id = +params['id'];
                this.getProduct(id);
            }
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    getProduct(id: number): void {
        console.log("in edit component getproduct");
        this.productService.getProduct(id)
            .subscribe(
                (product: IProduct) => this.onProductRetrieved(product),
                (error: any) => this.errorMessage = <any>error);
    }

    onProductRetrieved(product: IProduct): void {
        if (this.productForm) {
            this.productForm.reset();
        };

        this.product = product;

        if (this.product.id === 0){
            this.pageTitle = 'Add Product';
        }
        else {
            this.pageTitle = `Edit Product: ${this.product.productName}`;
        }

        this.productForm.patchValue({
            productName: this.product.productName,
            productCode: this.product.productCode,
            starRating: this.product.starRating,
            description: this.product.description
        });

        // this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
    }

    saveProduct(): void {
        console.log("in edit component saveProduct");
        if (this.productForm.dirty && this.productForm.valid) {
            let p=Object.assign({}, this.product, this.productForm.value);

            this.productService.saveProduct(p)
                                .subscribe(
                                    ()=>this.onSaveComplete(),
                                    (error: any) => this.errorMessage = <any>error
                                );

        }
        else if (!this.productForm.dirty) {
                this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        this.productForm.reset;
        this.router.navigate(['/products']);
    }

    deleteProduct(): void {
        if (this.product.id == 0) {
            this.onSaveComplete();
        }

        if (!confirm(`really delete ${this.product.productName}?`)) return;
        
        this.productService.deleteProduct(this.product.id)
            .subscribe(
                ()=>this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
            );
    }
}
