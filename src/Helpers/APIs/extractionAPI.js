import { getToken, getUser } from "../../utilities/Common";
import { getAPICall, postAPICall } from "../AxiosMethodCalls";

export const getExtractionPatients = async () => {
  try {
    var params = new URLSearchParams();
    params.append("requester", getUser());
    params.append("api_key", window.$api_key);
    params.append("token", getToken().replace(/['"]+/g, ""));
    const response = await postAPICall(
      window.$link + "bookings/extractionManager",

      {
        requester: getUser(),
        api_key: window.$api_key,
        token: getToken().replace(/['"]+/g, ""),
      }
    );

    return { data: response.data };
  } catch (error) {
    return { error: error.response };
  }
};
