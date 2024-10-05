import { Router } from 'express';
import ProductRepositoryPostgres from '../../Infrastructures/repository/ProductRepositoryPostgres';
import CategoryRepositoryPostgres from '../../Infrastructures/repository/CategoryRepositotyPostgres';
import ProductUseCase from '../../Applications/use_case/Productusecase';
import ProductController from './ProductController';
import uploadFile from '../../middleware/UploadImage';

const ProductRoutes = Router();
const productRepository = new ProductRepositoryPostgres();
const categoryRepository = new CategoryRepositoryPostgres();
const productUseCase = new ProductUseCase(productRepository, categoryRepository);
const productController = new ProductController(productUseCase);

ProductRoutes.post('/', uploadFile.single("image"), productController.createProduct.bind(productController));
ProductRoutes.get('/', productController.getAllProduct.bind(productController));
ProductRoutes.get('/:id', productController.getProductById.bind(productController));
ProductRoutes.put('/:id', uploadFile.single("image"), productController.putProductById.bind(productController));
ProductRoutes.delete('/:id', productController.deleteProductById.bind(productController));

export default ProductRoutes;
