import axios from "axios";
import UserType from "./User";

interface Claim {
	type: string;
	value: string;
}

export async function getCurrentUser(): Promise<UserType> {
	const response = await axios.get<Claim[]>("/bff/user", {
		headers: { "CustomHeaderToProtectFromXCSRF": "true" },
	});

	const claimsMap = new Map(
		response.data.map((claim) => [claim.type, claim.value])
	);

	const user: UserType = {
		name: claimsMap.get("name")!,
		firstName: claimsMap.get("given_name")!,
		lastName: claimsMap.get("family_name")!,
		email: claimsMap.get("email")!,
		logoutUrl: claimsMap.get("bff:logout_url")!,
	};

	return user;
}

export async function userLogout(path: string): Promise<void> {
	await axios.get(path, {
		headers: { "CustomHeaderToProtectFromXCSRF": "true" },
	});
}
