import multer, { StorageEngine } from 'multer';

// Fungsi filter untuk memvalidasi tipe file
const fileFilter = (req: any, file: Express.Multer.File, cb: Function) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('File type not allowed!'), false);
    }
};

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'src/interface/product/image/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const uploadFile = multer({ storage: storage, fileFilter });
export default uploadFile;