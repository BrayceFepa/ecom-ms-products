import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Products} from './products.model';

@model({
  settings: {
    foreignKeys: {
      fkImageIdProduct: {
        name: "fkImageIdProduct",
        entity: 'Products',
        entityKey: 'id',
        foreignKey: 'id_product',
      }
    },
  },
})
export class Images extends Entity {
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

  @belongsTo(() => Products, {name: 'belong_to_product'})
  id_product: number;

  constructor(data?: Partial<Images>) {
    super(data);
  }
}

export interface ImagesRelations {
  // describe navigational properties here
}

export type ImagesWithRelations = Images & ImagesRelations;
