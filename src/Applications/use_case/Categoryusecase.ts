import CategoryRepositoryPostgres from "../../Infrastructures/repository/CategoryRepositotyPostgres.js";
import Category from "../../Domains/category/entities/Category";

class CategoryUseCase {
  private categoryRepository : CategoryRepositoryPostgres;

  constructor(categoryRepository: CategoryRepositoryPostgres) {
    this.categoryRepository = categoryRepository;
  }

  async createCategory(category: Category): Promise<any> {
    const data = await this.categoryRepository.addCategory(category);
    return {
        status: true,
        statusCode: 201,
        data
    };
  }

  async getAllCategory(): Promise<any> {
    const data = await this.categoryRepository.getAllCategory()
    return {
        status: true,
        statusCode: 200,
        data
    };
  }

  async getCategoryById(id: string): Promise<any> {
    return await this.categoryRepository.getCategoryById(id)
  }

  async updateCategory(id: string, payload: any): Promise<any> {
    const { name } = payload;
    const isExist = await this.categoryRepository.getCategoryById(id)
    if (!isExist) {
        return {
            status: false,
            statusCode: 404,
            error: 'Category not found'
        }
    }

    const data = await this.categoryRepository.updateCategory(id, name)

    if (data) {
        return {
            statusCode: 200,
        }
    }
  }

  async deleteCategoryById(id: string): Promise<any> {
    return await this.categoryRepository.deleteCategory(id)
  }
}

export default CategoryUseCase;
