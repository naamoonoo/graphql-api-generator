import { User } from "../../../entities/User";
import { JWT } from "../../../types/constants";
import { createJWT } from "../../../utils/jwt";
import { getApi } from "../../../utils/testUtils/api";
import "../../../utils/testUtils/database";
import { getQuery } from "../../../utils/testUtils/getQuery";

describe("[User]GetCurrentUser", () => {
	let api;
	let token;

	const variables = {
		email: "email@email.com",
		username: "andy"
	};

	beforeAll(async () => {
		const userCreated = await User.create({
			...variables,
			password: "password!123"
		}).save();
		token = createJWT(userCreated!.id);
	});

	beforeEach(() => {
		api = getApi();
	});

	const query = `query {
		GetCurrentUser{
				res
				error
				user {
					id
					email
					username
				}
			}
		}`;

	it("should pass, jwt has been set in header", async () => {
		const response = await api
			.set(JWT, token)
			.send({ query: getQuery(query) })
			.expect(200)
			.then(response => response.body.data.GetCurrentUser);
		const { res, error, user } = response;
		expect(res).toBeTruthy();
		expect(error).toBeNull();
		expect(user).not.toBeUndefined();
		expect(user).toMatchObject(variables);
	});

	it("should fail, no jwt", async () => {
		const response = await api
			.send({ query: getQuery(query) })
			.expect(200)
			.then(response => response.body.data);
		expect(response).toBeNull();
	});
});
