import { getToken, getUser } from "../../utilities/Common";
import { getAPICall, postAPICall } from "../AxiosMethodCalls";

export const generateBulkInvoice = async (
  company_id,
  discount_ids,
  remarks,
  particulars
) => {
  try {
    var params = new URLSearchParams();
    params.append("requester", getUser());
    params.append("api_key", window.$api_key);
    params.append("token", getToken().replace(/['"]+/g, ""));
    const response = await postAPICall(
      window.$link + "Company_invoices/createBulk",

      {
        added_by: getUser(),
        api_key: window.$api_key,
        token: getToken().replace(/['"]+/g, ""),
        company_id: company_id,
        discount_ids: discount_ids.map((data) => {
          return data.id;
        }),
        remarks: remarks,
        particulars: particulars,
      }
    );

    return { data: response.data.data };
  } catch (error) {
    return { error: error.response };
  }
};

export const getAllCompanies = async () => {
  try {
    const response = await postAPICall(
      window.$link + "companies/getAll",

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

export const getCompanyDiscounts = async (company_id) => {
  try {
    const response = await postAPICall(
      window.$link + "discounts/company/" + company_id,

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
