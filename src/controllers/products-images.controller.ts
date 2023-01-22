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
  Products,
  Images,
} from '../models';
import {ProductsRepository} from '../repositories';

export class ProductsImagesController {
  constructor(
    @repository(ProductsRepository) protected productsRepository: ProductsRepository,
  ) { }

  @get('/products/{id}/images', {
    responses: {
      '200': {
        description: 'Array of Products has many Images',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Images)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Images>,
  ): Promise<Images[]> {
    return this.productsRepository.images(id).find(filter);
  }

  @post('/products/{id}/images', {
    responses: {
      '200': {
        description: 'Products model instance',
        content: {'application/json': {schema: getModelSchemaRef(Images)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Products.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Images, {
            title: 'NewImagesInProducts',
            exclude: ['id'],
            optional: ['id_product']
          }),
        },
      },
    }) images: Omit<Images, 'id'>,
  ): Promise<Images> {
    return this.productsRepository.images(id).create(images);
  }

  @patch('/products/{id}/images', {
    responses: {
      '200': {
        description: 'Products.Images PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Images, {partial: true}),
        },
      },
    })
    images: Partial<Images>,
    @param.query.object('where', getWhereSchemaFor(Images)) where?: Where<Images>,
  ): Promise<Count> {
    return this.productsRepository.images(id).patch(images, where);
  }

  @del('/products/{id}/images', {
    responses: {
      '200': {
        description: 'Products.Images DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Images)) where?: Where<Images>,
  ): Promise<Count> {
    return this.productsRepository.images(id).delete(where);
  }
}
