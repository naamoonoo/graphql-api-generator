import cors from "cors";
import { Express } from "express";
import helmet from "helmet";
import logger from "morgan";

import { JWT } from "./types/constants";
import { verifyJWT } from "./utils/jwt";

// custom middlewares
export const decodeJWT = async (req, res, next): Promise<void> => {
	const token = req.get(JWT);
	if (token) {
		const user = await verifyJWT(token);
		req.user = user;
	}
	next();
};

export default (app: Express) => {
	app.use(cors());
	app.use(helmet());
	app.use(logger("dev"));
	// app.use(passport.initialize());
	app.use(decodeJWT);
	// app.use(express.static(path.join(__dirname, "client/build")));
};
