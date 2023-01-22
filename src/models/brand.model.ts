import {Entity, model, property, hasMany} from '@loopback/repository';
import {Products} from './products.model';

@model()
export class Brand extends Entity {
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

  @hasMany(() => Products, {keyTo: 'id_brand'})
  products: Products[];

  constructor(data?: Partial<Brand>) {
    super(data);
  }
}

export interface BrandRelations {
  // describe navigational properties here
}

export type BrandWithRelations = Brand & BrandRelations;
