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
ProductCategory,
Categories,
} from '../models';
import {ProductsRepository} from '../repositories';

export class ProductsCategoriesController {
  constructor(
    @repository(ProductsRepository) protected productsRepository: ProductsRepository,
  ) { }

  @get('/products/{id}/categories', {
    responses: {
      '200': {
        description: 'Array of Products has many Categories through ProductCategory',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Categories)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Categories>,
  ): Promise<Categories[]> {
    return this.productsRepository.categories(id).find(filter);
  }

  @post('/products/{id}/categories', {
    responses: {
      '200': {
        description: 'create a Categories model instance',
        content: {'application/json': {schema: getModelSchemaRef(Categories)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Products.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categories, {
            title: 'NewCategoriesInProducts',
            exclude: ['id'],
          }),
        },
      },
    }) categories: Omit<Categories, 'id'>,
  ): Promise<Categories> {
    return this.productsRepository.categories(id).create(categories);
  }

  @patch('/products/{id}/categories', {
    responses: {
      '200': {
        description: 'Products.Categories PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categories, {partial: true}),
        },
      },
    })
    categories: Partial<Categories>,
    @param.query.object('where', getWhereSchemaFor(Categories)) where?: Where<Categories>,
  ): Promise<Count> {
    return this.productsRepository.categories(id).patch(categories, where);
  }

  @del('/products/{id}/categories', {
    responses: {
      '200': {
        description: 'Products.Categories DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Categories)) where?: Where<Categories>,
  ): Promise<Count> {
    return this.productsRepository.categories(id).delete(where);
  }
}
