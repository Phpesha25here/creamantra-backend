import multer from "multer";
const upload=multer({storage:multer.diskStorage({})});
destination: "uploads/"
export default upload;