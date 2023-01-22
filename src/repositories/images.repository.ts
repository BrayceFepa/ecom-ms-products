import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Images, ImagesRelations, Products} from '../models';
import {ProductsRepository} from './products.repository';

export class ImagesRepository extends DefaultCrudRepository<
  Images,
  typeof Images.prototype.id,
  ImagesRelations
> {

  public readonly belong_to_product: BelongsToAccessor<Products, typeof Images.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ProductsRepository') protected productsRepositoryGetter: Getter<ProductsRepository>,
  ) {
    super(Images, dataSource);
    this.belong_to_product = this.createBelongsToAccessorFor('belong_to_product', productsRepositoryGetter,);
    this.registerInclusionResolver('belong_to_product', this.belong_to_product.inclusionResolver);
  }
}
