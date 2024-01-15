import { getToken, getUser } from "../../utilities/Common"
import { postAPICall } from "../AxiosMethodCalls"

export const approveHMO = async (id) => {
  try {
    var params = new URLSearchParams()
    params.append("requester", getUser())
    params.append("api_key", window.$api_key)
    params.append("token", getToken().replace(/['"]+/g, ""))
    const response = await postAPICall(
      window.$link + "Company_invoices/mark_approved/" + id,

      {
        updated_by: getUser(),
        api_key: window.$api_key,
        token: getToken().replace(/['"]+/g, ""),
      }
    )

    return { data: response.data }
  } catch (error) {
    return { error: error.response }
  }
}
export const disapproveHMO = async (id) => {
  try {
    var params = new URLSearchParams()
    params.append("requester", getUser())
    params.append("api_key", window.$api_key)
    params.append("token", getToken().replace(/['"]+/g, ""))
    const response = await postAPICall(
      window.$link + "Company_invoices/mark_disapproved/" + id,

      {
        updated_by: getUser(),
        api_key: window.$api_key,
        token: getToken().replace(/['"]+/g, ""),
      }
    )

    return { data: response.data }
  } catch (error) {
    return { error: error.response }
  }
}
