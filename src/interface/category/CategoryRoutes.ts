import { Router } from 'express';
import CategoryRepositoryPostgres from '../../Infrastructures/repository/CategoryRepositotyPostgres';
import CategoryUseCase from '../../Applications/use_case/Categoryusecase';
import CategoryController from './CategoryController';

const CategoryRoutes = Router();
const categoryRepository = new CategoryRepositoryPostgres();
const categoryUseCase = new CategoryUseCase(categoryRepository);
const categoryController = new CategoryController(categoryUseCase);

CategoryRoutes.post('/', categoryController.createcategory.bind(categoryController));
CategoryRoutes.get('/', categoryController.getAllCategory.bind(categoryController));

export default CategoryRoutes;
