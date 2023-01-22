import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Images,
  Products,
} from '../models';
import {ImagesRepository} from '../repositories';

export class ImagesProductsController {
  constructor(
    @repository(ImagesRepository)
    public imagesRepository: ImagesRepository,
  ) { }

  @get('/images/{id}/products', {
    responses: {
      '200': {
        description: 'Products belonging to Images',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Products)},
          },
        },
      },
    },
  })
  async getProducts(
    @param.path.number('id') id: typeof Images.prototype.id,
  ): Promise<Products> {
    return this.imagesRepository.belong_to_product(id);
  }
}
