import { Request, Response } from 'express';
import CategoryUseCase from '../../Applications/use_case/Categoryusecase';
import response  from '../../helper/response';

class CategoryController {
    private categoryUseCase: CategoryUseCase;
    
    constructor(categoryUseCase: CategoryUseCase) {
        this.categoryUseCase = categoryUseCase;
    }

    async createcategory(req: Request, res: Response): Promise<any> {
        try {
            const result = await this.categoryUseCase.createCategory(req.body);
            response.sendResponse(res, result)
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllCategory(req: Request, res: Response) {
        try {
            const result = await this.categoryUseCase.getAllCategory();
            response.sendResponse(res, result)
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default CategoryController;
