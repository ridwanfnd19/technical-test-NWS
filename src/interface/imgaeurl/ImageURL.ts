import { Router } from 'express';
import { Request, Response } from 'express';
import path from 'path';

const ImgaeURL = Router();

ImgaeURL.get('/:id', async (req: Request, res: Response) => {
    const root = path.join(__dirname, '..', `product/image/`)
    res.sendFile(req.params.id, { root })
});

export default ImgaeURL;
