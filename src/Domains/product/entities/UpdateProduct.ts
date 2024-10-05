import { ValidationError } from "../../../Commons/exceptions/Error";
import Joi from "joi";
import path from "path";
import fs from 'fs';

class UpdateProduct {
    public id: string;
    public name: string;
    public desc: string;
    public image: string;
    public category_id: string;
  
    constructor(payload: any) {
        this._verifyPayload(payload);

        this.id = payload.id;
        this.name = payload.name;
        this.desc = payload.desc;
        this.image = payload.image;
        this.category_id = payload.category_id;
    }

    _verifyPayload(payload: any) {
        const updateSchema = Joi.object({
            id: Joi.string().uuid().required().messages({
                'string.guid': 'Id product must be a string uuid.',
                'string.empty': 'Id product cannot be empty.',
                'any.required': 'Id product is mandatory.'
            }),
            name: Joi.string().required().messages({
                'string.base': 'Name must be a string.',
                'string.empty': 'Name cannot be empty.',
                'any.required': 'Name is mandatory.'
            }),
            desc: Joi.string().required().messages({
                'string.base': 'Description must be a string.',
                'string.empty': 'Description cannot be empty.',
                'any.required': 'Description is mandatory.'
            }),
            image: Joi.string().messages({
                'string.base': 'Image must be a string.',
                'string.empty': 'Image cannot be empty.',
            }),
            category_id: Joi.string().uuid().required().messages({
                'string.base': 'CategoryId must be a uuid.',
                'string.empty': 'CategoryId cannot be empty.',
                'any.required': 'CategoryId is mandatory.',
                'string.guid': 'Id product must be a string uuid.',
            }),
        });

        const { error } = updateSchema.validate(payload);
        
        if (error) {
            if (payload.image != 'undefined') {
                const imagePath = path.join(__dirname, '../../../', `interface/product/image/${payload.image}`);
                fs.unlinkSync(imagePath);
            }
            throw new ValidationError(error.message)
        }
    }
}
  
export default UpdateProduct;
  