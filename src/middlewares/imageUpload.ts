import multer from "multer";
import { extname } from "path";

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, `public/images/${req.baseUrl.includes('users')?'users':'games'}`);
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + Math.floor(Math.random()).toString() + extname(file.originalname));
  }
});

const imageUpload = multer({ storage: storage,fileFilter(req, file, callback) {
  if(extname(file.originalname) !== '.png' && extname(file.originalname) !== '.jpg'){
    return callback(new Error("Please send images in PNG or JPG format only"));
  }
  callback(undefined, true);
}, });

export default imageUpload ;