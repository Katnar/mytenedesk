import { iRequestResult } from "../../interfaces";
import logger from "./logger";

const redirect = import.meta.env.REDIRECT_URL;

// vite takes care of the url
const ip = import.meta.env.MODE === "development" ?  "AtalReservesApi" : "http://backmeha.idf/api";

export const GlobalAxios = async (
	reqType: "GET" | "POST" | "PUT" | "DELETE",
	reqURL: string,
	body: object | FormData= {},
	isFile?: boolean,
	isPublic?: boolean
) : Promise<iRequestResult<any>> => {

	const backendIp = isPublic ? ip.replace("AtalReservesApi", "public") : ip;
	logger(backendIp + "/" + reqURL)

	if ((typeof body != "object" || (Array.isArray(body) && typeof body[0] == "object"))) {
		console.error("body have to be an object or array of objects");
	}
	const commonTypes = {
		credentials: "omit" as RequestCredentials,
		...(isFile
		  ? {
			headers: {
				"Authorization": `Bearer ${localStorage.getItem("jwt")}`
			}
		  } // Omit headers when isFile is true
		  : {
			  headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${localStorage.getItem("jwt")}`
        
				// data: cleanCookie_data(document.cookie).session_cookie,
			  },
			}),
	  };

	try {
		const result =  reqType !== "GET"
			? await fetch(`${backendIp}/${reqURL}`, {
				method: reqType,
				...commonTypes,
				body: isFile ? body : JSON.stringify(body),
					
			  })
			: await fetch(`${backendIp}/${reqURL}`, {
					...commonTypes,
					method: reqType,
			  });
		if (result.status === 401){
			return {
				error: true,
				error_message: "unauth"
			}
		}
		const parsed = await result.json();
		return {
			error: parsed.error,
			data: parsed.data,
			error_message: parsed.error_message
		}
	} catch (error: any) {
		console.error(error);
		if (
			error.response.data == "session not found" ||
			error.response.data == "no session id was specified"
		) {
			alert(
				"זמן השהות שלך פג תוקף או לחילופין דרך ההתחברות שלך אינה הייתה תקנית אנא התחבר מחדש"
			);
			//* on prod change to /signin
			window.location.href = redirect;

			return {
				error: true,
				error_message: "זמן השהות שלך פג תוקף או לחילופין דרך ההתחברות שלך אינה הייתה תקנית אנא התחבר מחדש"
			}
		} else {
			if (reqType === "GET")
				logger(`${backendIp}/${reqURL} returned an error, check the request`);
			else
				logger(
					`${backendIp}/${reqURL} returned an error, check the request and the body ${body}`
				);

			return {
				error: true, 
				error_message: "שגיאה לא ידועה",
			};
		}
	}
};
