import {Router} from "express"
import {getChannelStats ,getChannelVideos} from "../controllers/dashboard.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/stats/:channelName").get(getChannelStats);
router.route("/videos/:channelName").get(getChannelVideos);

export default router;
