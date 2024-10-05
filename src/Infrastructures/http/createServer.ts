import express from "express";
import cors from "cors";
import sequelizeConnection from '../database/postgres/pool'
import CategoryRoutes from "../../interface/category/CategoryRoutes";
import ProductRoutes from "../../interface/product/ProductRoutes";
import ImgaeURL from "../../interface/imgaeurl/ImageURL";

const createServer = async () => {
    const app = express();
    const port = process.env.PORT;

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Sync database
    sequelizeConnection.sync()
        .then(() => console.log('Database connected'))
        .catch(err => console.log('Error: ' + err));

    // Routes
    app.use('/api/category', CategoryRoutes);
    app.use('/api/product', ProductRoutes);
    app.use('/api/image', ImgaeURL)

    app.listen(port, () => {
        console.log(`Server is running on http://${process.env.HOST}:${port}`);
    });
};

export default createServer;
