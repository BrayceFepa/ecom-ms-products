import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Brand,
  Products,
} from '../models';
import {BrandRepository} from '../repositories';

export class BrandProductsController {
  constructor(
    @repository(BrandRepository) protected brandRepository: BrandRepository,
  ) { }

  @get('/brands/{id}/products', {
    responses: {
      '200': {
        description: 'Array of Brand has many Products',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Products)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Products>,
  ): Promise<Products[]> {
    return this.brandRepository.products(id).find(filter);
  }

  @post('/brands/{id}/products', {
    responses: {
      '200': {
        description: 'Brand model instance',
        content: {'application/json': {schema: getModelSchemaRef(Products)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Brand.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Products, {
            title: 'NewProductsInBrand',
            exclude: ['id'],
            optional: ['id_brand']
          }),
        },
      },
    }) products: Omit<Products, 'id'>,
  ): Promise<Products> {
    return this.brandRepository.products(id).create(products);
  }

  @patch('/brands/{id}/products', {
    responses: {
      '200': {
        description: 'Brand.Products PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Products, {partial: true}),
        },
      },
    })
    products: Partial<Products>,
    @param.query.object('where', getWhereSchemaFor(Products)) where?: Where<Products>,
  ): Promise<Count> {
    return this.brandRepository.products(id).patch(products, where);
  }

  @del('/brands/{id}/products', {
    responses: {
      '200': {
        description: 'Brand.Products DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Products)) where?: Where<Products>,
  ): Promise<Count> {
    return this.brandRepository.products(id).delete(where);
  }
}
