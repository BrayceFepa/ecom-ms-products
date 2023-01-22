import {Entity, belongsTo, hasMany, model, property} from '@loopback/repository';
import {Brand} from './brand.model';
import {Categories} from './categories.model';
import {Images} from './images.model';
import {ProductCategory} from './product-category.model';

@model({
  settings: {
    foreignKeys: {
      fkProductIdBrand: {
        name: "fkProductIdBrand",
        entity: 'Brand',
        entityKey: 'id',
        foreignKey: 'id_brand',
      }
    },
  },
})
export class Products extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'number',
    default: 0,
  })
  quantity?: number;

  @property({
    type: 'number',
    default: 0,
  })
  qualification?: number;

  @property({
    type: 'number',
    default: 0,
  })
  discount?: number;

  @belongsTo(() => Brand, {name: 'has_brand'})
  id_brand: number;

  @hasMany(() => Categories, {through: {model: () => ProductCategory, keyFrom: 'id_product', keyTo: 'id_category'}})
  categories: Categories[];

  @hasMany(() => Images, {keyTo: 'id_product'})
  images: Images[];

  constructor(data?: Partial<Products>) {
    super(data);
  }
}

export interface ProductsRelations {
  // describe navigational properties here
}

export type ProductsWithRelations = Products & ProductsRelations;
