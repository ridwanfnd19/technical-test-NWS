class CategoryRepository {
    async addCategory(category: any): Promise<any> {}

    async updateCategory(id: string, name: string): Promise<any> {}

    async getAllCategory(): Promise<any> {}

    async getCategoryById(id: string): Promise<any> {}

    async deleteCategory(id: string): Promise<any> {}
}
  
export default CategoryRepository;
  