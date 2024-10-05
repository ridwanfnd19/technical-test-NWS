import CategoryRepository from "../../Domains/category/CategoryRepository";
import CategoryModel from "./models/CategoryModel";

class CategoryRepositoryPostgres extends CategoryRepository {
    async addCategory(category: any) {
        const { name }  = category;
        const createdCategory = await CategoryModel.create({ name });
        return createdCategory
    }

    async getAllCategory(): Promise<any> {
        const categories = await CategoryModel.findAll();
        return categories
    }

    async getCategoryById(id: string): Promise<any> {
        const category = await CategoryModel.findOne({
            where: {
                id
            }
        })
        return category
    }

    async updateCategory(id: string, name: string): Promise<any> {
        const category = await CategoryModel.update(
            { "name" : name },
            { where: { id } },
        )
        return category
    }
}

export default CategoryRepositoryPostgres