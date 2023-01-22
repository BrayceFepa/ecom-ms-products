import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Products} from './products.model';

@model()
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
