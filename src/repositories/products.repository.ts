import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Products, ProductsRelations, Brand, Categories, ProductCategory, Images} from '../models';
import {BrandRepository} from './brand.repository';
import {ProductCategoryRepository} from './product-category.repository';
import {CategoriesRepository} from './categories.repository';
import {ImagesRepository} from './images.repository';

export class ProductsRepository extends DefaultCrudRepository<
  Products,
  typeof Products.prototype.id,
  ProductsRelations
> {

  public readonly has_brand: BelongsToAccessor<Brand, typeof Products.prototype.id>;

  public readonly categories: HasManyThroughRepositoryFactory<Categories, typeof Categories.prototype.id,
          ProductCategory,
          typeof Products.prototype.id
        >;

  public readonly images: HasManyRepositoryFactory<Images, typeof Products.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('BrandRepository') protected brandRepositoryGetter: Getter<BrandRepository>, @repository.getter('ProductCategoryRepository') protected productCategoryRepositoryGetter: Getter<ProductCategoryRepository>, @repository.getter('CategoriesRepository') protected categoriesRepositoryGetter: Getter<CategoriesRepository>, @repository.getter('ImagesRepository') protected imagesRepositoryGetter: Getter<ImagesRepository>,
  ) {
    super(Products, dataSource);
    this.images = this.createHasManyRepositoryFactoryFor('images', imagesRepositoryGetter,);
    this.registerInclusionResolver('images', this.images.inclusionResolver);
    this.categories = this.createHasManyThroughRepositoryFactoryFor('categories', categoriesRepositoryGetter, productCategoryRepositoryGetter,);
    this.registerInclusionResolver('categories', this.categories.inclusionResolver);
    this.has_brand = this.createBelongsToAccessorFor('has_brand', brandRepositoryGetter,);
    this.registerInclusionResolver('has_brand', this.has_brand.inclusionResolver);
  }
}
