import { getToken, getUser } from "../../utilities/Common";
import { getAPICall, postAPICall } from "../AxiosMethodCalls";

export const changeStatus = async (queue_id, status) => {
  try {
    const response = await postAPICall(
      window.$link + "customers/changeQueueStatus",

      {
        requester: getUser(),
        api_key: window.$api_key,
        token: getToken().replace(/['"]+/g, ""),
        queue_id: queue_id,
        status: status,
      }
    );

    return { data: response.data };
  } catch (error) {
    return { error: error.response };
  }
};

export const generateExtractionQueue = async (data) => {
  try {
    const response = await postAPICall(
      window.$link + "customers/generateQueue",

      {
        requester: getUser(),
        api_key: window.$api_key,
        token: getToken().replace(/['"]+/g, ""),
        ...data
      }
    );

    return { data: response.data };
  } catch (error) {
    return { error: error.response };
  }
};

export const fetchServing = async () => {
  try {
    const response = await postAPICall(
      window.$link + "customers/nowServing",

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


