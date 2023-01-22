import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fkCatProdIdProduct: {
        name: "fkCatProdIdProduct",
        entity: 'Products',
        entityKey: 'id',
        foreignKey: 'id_product',
      },
      fkCatProdIdCategory: {
        name: "fkCatProdIdCategory",
        entity: "Categories",
        entityKey: "id",
        foreignKey: "id_category"
      },
    }
  },
})
export class ProductCategory extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  id_product?: number;

  @property({
    type: 'number',
  })
  id_category?: number;

  constructor(data?: Partial<ProductCategory>) {
    super(data);
  }
}

export interface ProductCategoryRelations {
  // describe navigational properties here
}

export type ProductCategoryWithRelations = ProductCategory & ProductCategoryRelations;
