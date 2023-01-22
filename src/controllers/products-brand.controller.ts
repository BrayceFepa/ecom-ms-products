import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Products,
  Brand,
} from '../models';
import {ProductsRepository} from '../repositories';

export class ProductsBrandController {
  constructor(
    @repository(ProductsRepository)
    public productsRepository: ProductsRepository,
  ) { }

  @get('/products/{id}/brand', {
    responses: {
      '200': {
        description: 'Brand belonging to Products',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Brand)},
          },
        },
      },
    },
  })
  async getBrand(
    @param.path.number('id') id: typeof Products.prototype.id,
  ): Promise<Brand> {
    return this.productsRepository.has_brand(id);
  }
}
