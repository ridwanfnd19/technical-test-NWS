import { Request, Response } from 'express';
import ProductUseCase from '../../Applications/use_case/Productusecase';
import response  from '../../helper/response';
import { ClientError } from '../../Commons/exceptions/Error';

class ProductController {
    private productUseCase: ProductUseCase;
    
    constructor(productUseCase: ProductUseCase) {
        this.productUseCase = productUseCase;
    }

    private handleError(res: Response, error: any) {
        if (error instanceof ClientError) {
            return response.sendResponse(res, {
                status: false,
                statusCode: error.statusCode,
                error: error.message
            });
        } else {
            return res.status(500).json({
                error: 'Internal Server Error',
            });
        }
    }

    async createProduct(req: Request, res: Response): Promise<any> {
        try {
            const { name, desc, category_id } = req.body;
            const image = `${req.file?.filename}`;
            const result = await this.productUseCase.createProduct({
                name, desc, image, category_id
            });
            response.sendResponse(res, result)
        } catch (error: any) {
            return this.handleError(res, error);
        }
    }

    async getAllProduct(req: Request, res: Response): Promise<any> {
        try {
            const result = await this.productUseCase.getAllProduct();
            response.sendResponse(res, result)
        } catch (error: any) {
            return this.handleError(res, error);
        }
    }

    async getProductById(req: Request, res: Response): Promise<any> {
        try {
            const result = await this.productUseCase.getProductById(req.params.id);
            response.sendResponse(res, result)
        } catch (error: any) {
            if (error instanceof ClientError) {
                response.sendResponse(res, {
                    status: false,
                    statusCode: error.statusCode,
                    error: error.message
                })
            } else {
                return res.status(500).json({
                    error: 'Internal Server Error',
                });
            }
        }
    }

    async putProductById(req: Request, res: Response): Promise<any> {
        try {
            const id = req.params.id;
            const { name, desc, category_id } = req.body;
            const image = `${req.file?.filename}`;
            const result = await this.productUseCase.updateProduct({ id, name, desc, image, category_id });
            response.sendResponse(res, result)
        } catch (error: any) {
            if (error instanceof ClientError) {
                response.sendResponse(res, {
                    status: false,
                    statusCode: error.statusCode,
                    error: error.message
                })
            } else {
                return res.status(500).json({
                    error: 'Internal Server Error',
                });
            }
        }
    }

    async deleteProductById(req: Request, res: Response): Promise<any> {
        try {
            const result = await this.productUseCase.deleteProductById(req.params.id);
            response.sendResponse(res, result)
        } catch (error: any) {
            if (error instanceof ClientError) {
                response.sendResponse(res, {
                    status: false,
                    statusCode: error.statusCode,
                    error: error.message
                })
            } else {
                return res.status(500).json({
                    error: 'Internal Server Error',
                });
            }
        }
    }
}

export default ProductController;
