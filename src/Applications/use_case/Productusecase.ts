import ProductRepositoryPostgres from '../../Infrastructures/repository/ProductRepositoryPostgres';
import CategoryRepositoryPostgres from '../../Infrastructures/repository/CategoryRepositotyPostgres';
import { ValidationError } from '../../Commons/exceptions/Error';
import Product from '../../Domains/product/entities/Product';
import UpdateProduct from '../../Domains/product/entities/UpdateProduct';
import path from 'path';
import fs from 'fs';
import Joi from 'joi';

class ProductUseCase {
  private productRepository: ProductRepositoryPostgres;
  private categoryRepository : CategoryRepositoryPostgres;

  constructor(productRepository: ProductRepositoryPostgres, categoryRepository : CategoryRepositoryPostgres) {
    this.productRepository = productRepository;
    this.categoryRepository = categoryRepository;
  }

  async createProduct(payload: any): Promise<any> {
    const product = new Product(payload)
    console.log(product)
    const data = await this.productRepository.addProduct(product);
    return {
        status: true,
        statusCode: 201,
        data
    };
  }

  async getAllProduct(): Promise<any> {
    const data = await this.productRepository.getAllProduct()
    return {
        status: true,
        statusCode: 200,
        data
    }
  }

  async getProductById(id: string): Promise<any> {
    const productSchema = Joi.object({
        id: Joi.string().uuid().required().messages({
            'string.base': 'Id must be a string uuid.',
            'string.guid': 'Id must be a string uuid.',
            'string.empty': 'Id cannot be empty.',
            'any.required': 'Id is mandatory.'
        }),
    });

    const { error } = productSchema.validate({id});
    
    if (error) {
        throw new ValidationError(error.message)
    }
    const data = await this.productRepository.getProductById(id)
    if (!data) {
        return {
            status: false,
            statusCode: 404,
            error: 'Product not found'
        }
    }

    return {
        status: true,
        statusCode: 200,
        data
    }
  }

  async updateProduct(payload: any): Promise<any> {
    const updateProduct = new UpdateProduct(payload)
    const product = await this.productRepository.getProductById(updateProduct.id)
    if (!product) {
        const imagePath = path.join(__dirname, '../../', `interface/product/image/${payload.image}`);
        fs.unlinkSync(imagePath);
        return {
            status: false,
            statusCode: 404,
            error: 'Product not found'
        }
    }

    const category = await this.categoryRepository.getCategoryById(updateProduct.category_id)
    if (!category) {
        const imagePath = path.join(__dirname, '../../', `interface/product/image/${payload.image}`);
        fs.unlinkSync(imagePath);
        return {
            status: false,
            statusCode: 404,
            error: 'Category not found'
        }
    }

    let image = product.image;

    if (updateProduct.image != 'undefined') {
        const imagePath = path.join(__dirname, '../../', `interface/product/image/${product.image}`);
        fs.unlinkSync(imagePath);
        image = updateProduct.image;
    }

    await this.productRepository.updateProduct({
        id: updateProduct.id,
        name: updateProduct.name,
        desc: updateProduct.desc,
        image,
        category_id: updateProduct.category_id
    })

    return {
        status: true,
        statusCode: 200,
    }
  }

  async deleteProductById(id: string): Promise<any> {
    const productSchema = Joi.object({
        id: Joi.string().uuid().required().messages({
            'string.base': 'Id must be a string uuid.',
            'string.guid': 'Id must be a string uuid.',
            'string.empty': 'Id cannot be empty.',
            'any.required': 'Id is mandatory.'
        }),
    });

    const { error } = productSchema.validate({id});
    
    if (error) {
        throw new ValidationError(error.message)
    }

    const product = await this.productRepository.getProductById(id)

    if (!product) {
        return {
            status: false,
            statusCode: 404,
            error: 'Product not found'
        }
    }

    await this.productRepository.deleteProduct(id)

    const imagePath = path.join(__dirname, '../../', `interface/product/image/${product.image}`);
    fs.unlinkSync(imagePath);

    return {
        status: true,
        statusCode: 200
    }
  }
}

export default ProductUseCase;
