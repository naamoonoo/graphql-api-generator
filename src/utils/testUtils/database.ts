import { closeDBConn, openDBConn } from "../databaseConn";

beforeAll(async () => {
	return await openDBConn();
});

afterAll(async () => {
	return await closeDBConn();
});
