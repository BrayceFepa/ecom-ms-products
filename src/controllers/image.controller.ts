import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Images} from '../models';
import {ImagesRepository} from '../repositories';

export class ImageController {
  constructor(
    @repository(ImagesRepository)
    public imagesRepository : ImagesRepository,
  ) {}

  @post('/images')
  @response(200, {
    description: 'Images model instance',
    content: {'application/json': {schema: getModelSchemaRef(Images)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Images, {
            title: 'NewImages',
            exclude: ['id'],
          }),
        },
      },
    })
    images: Omit<Images, 'id'>,
  ): Promise<Images> {
    return this.imagesRepository.create(images);
  }

  @get('/images/count')
  @response(200, {
    description: 'Images model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Images) where?: Where<Images>,
  ): Promise<Count> {
    return this.imagesRepository.count(where);
  }

  @get('/images')
  @response(200, {
    description: 'Array of Images model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Images, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Images) filter?: Filter<Images>,
  ): Promise<Images[]> {
    return this.imagesRepository.find(filter);
  }

  @patch('/images')
  @response(200, {
    description: 'Images PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Images, {partial: true}),
        },
      },
    })
    images: Images,
    @param.where(Images) where?: Where<Images>,
  ): Promise<Count> {
    return this.imagesRepository.updateAll(images, where);
  }

  @get('/images/{id}')
  @response(200, {
    description: 'Images model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Images, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Images, {exclude: 'where'}) filter?: FilterExcludingWhere<Images>
  ): Promise<Images> {
    return this.imagesRepository.findById(id, filter);
  }

  @patch('/images/{id}')
  @response(204, {
    description: 'Images PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Images, {partial: true}),
        },
      },
    })
    images: Images,
  ): Promise<void> {
    await this.imagesRepository.updateById(id, images);
  }

  @put('/images/{id}')
  @response(204, {
    description: 'Images PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() images: Images,
  ): Promise<void> {
    await this.imagesRepository.replaceById(id, images);
  }

  @del('/images/{id}')
  @response(204, {
    description: 'Images DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.imagesRepository.deleteById(id);
  }
}
