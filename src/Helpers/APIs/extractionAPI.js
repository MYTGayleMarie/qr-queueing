import { getToken, getUser } from "../../utilities/Common"
import { getAPICall, postAPICall } from "../AxiosMethodCalls"

export const getExtractionPatients = async () => {
  try {
    var params = new URLSearchParams()
    params.append("requester", getUser())
    params.append("api_key", window.$api_key)
    params.append("token", getToken().replace(/['"]+/g, ""))
    const response = await postAPICall(
      window.$link + "bookings/extractionManager",
      {
        requester: getUser(),
        api_key: window.$api_key,
        token: getToken().replace(/['"]+/g, ""),
      }
    )
    return { data: response.data }
  } catch (error) {
    return { error: error.response }
  }
}

export const getSingleExtractionPatient = async (booking_id) => {
  try {
    var params = new URLSearchParams()
    params.append("requester", getUser())
    params.append("api_key", window.$api_key)
    params.append("token", getToken().replace(/['"]+/g, ""))
    const response = await postAPICall(
      window.$link + "bookings/extractionManager/" + booking_id,
      {
        requester: getUser(),
        api_key: window.$api_key,
        token: getToken().replace(/['"]+/g, ""),
      }
    )
    return { data: response.data }
  } catch (error) {
    return { error: error.response }
  }
}
export const getLabExtractionPatients = async (id) => {
  try {
    var params = new URLSearchParams()
    params.append("requester", getUser())
    params.append("api_key", window.$api_key)
    params.append("token", getToken().replace(/['"]+/g, ""))
    const response = await postAPICall(
      window.$link + "bookings/labExtraction",

      {
        requester: getUser(),
        api_key: window.$api_key,
        token: getToken().replace(/['"]+/g, ""),
        lab_test_id: id,
      }
    )

    return { data: response.data }
  } catch (error) {
    return { error: error.response }
  }
}
export const getSingleLabExtractionPatient = async (booking_id, id) => {
  try {
    var params = new URLSearchParams()
    params.append("requester", getUser())
    params.append("api_key", window.$api_key)
    params.append("token", getToken().replace(/['"]+/g, ""))
    const response = await postAPICall(
      window.$link + "bookings/labExtraction/" + booking_id,

      {
        requester: getUser(),
        api_key: window.$api_key,
        token: getToken().replace(/['"]+/g, ""),
        lab_test_id: id,
      }
    )

    return { data: response.data }
  } catch (error) {
    return { error: error.response }
  }
}
export const getXRAYExtractionPatients = async () => {
  try {
    var params = new URLSearchParams()
    params.append("requester", getUser())
    params.append("api_key", window.$api_key)
    params.append("token", getToken().replace(/['"]+/g, ""))
    const response = await postAPICall(
      window.$link + "bookings/xrayExtraction",

      {
        requester: getUser(),
        api_key: window.$api_key,
        token: getToken().replace(/['"]+/g, ""),
      }
    )

    return { data: response.data }
  } catch (error) {
    return { error: error.response }
  }
}
export const getSingleXRAYExtractionPatients = async (booking_id) => {
  try {
    var params = new URLSearchParams()
    params.append("requester", getUser())
    params.append("api_key", window.$api_key)
    params.append("token", getToken().replace(/['"]+/g, ""))
    const response = await postAPICall(
      window.$link + "bookings/xrayExtraction/" + booking_id,

      {
        requester: getUser(),
        api_key: window.$api_key,
        token: getToken().replace(/['"]+/g, ""),
      }
    )

    return { data: response.data }
  } catch (error) {
    return { error: error.response }
  }
}

export const updateExtractionPatient = async (data) => {
  try {
    var params = new URLSearchParams()
    params.append("requester", getUser())
    params.append("api_key", window.$api_key)
    params.append("token", getToken().replace(/['"]+/g, ""))
    const response = await postAPICall(
      window.$link + "Bookingdetails/updateExtraction",

      {
        updated_by: getUser(),
        api_key: window.$api_key,
        token: getToken().replace(/['"]+/g, ""),
        extracted_on: new Date(),
        status: "done",
        booking: data.booking_id,
      }
    )

    return { data: response.data }
  } catch (error) {
    return { error: error.response }
  }
}
export const updateExtractionPatientBulk = async (data) => {
  try {
    var params = new URLSearchParams()
    params.append("requester", getUser())
    params.append("api_key", window.$api_key)
    params.append("token", getToken().replace(/['"]+/g, ""))
    const response = await postAPICall(
      window.$link + "bookings/updateExtraction",

      {
        updated_by: getUser(),
        api_key: window.$api_key,
        token: getToken().replace(/['"]+/g, ""),
        extracted_on: new Date(),
        // status: "done",
        booking: data.booking_id,
      }
    )

    return { data: response.data }
  } catch (error) {
    return { error: error.response }
  }
}
export const updateExtractionXRAYPatientBulk = async (data) => {
  try {
    var params = new URLSearchParams()
    params.append("requester", getUser())
    params.append("api_key", window.$api_key)
    params.append("token", getToken().replace(/['"]+/g, ""))
    const response = await postAPICall(
      window.$link + "bookings/updatexrayExtraction",

      {
        updated_by: getUser(),
        api_key: window.$api_key,
        token: getToken().replace(/['"]+/g, ""),
        extracted_on: new Date(),
        // status: "done",
        booking: data.booking_id,
      }
    )

    return { data: response.data }
  } catch (error) {
    return { error: error.response }
  }
}
export const updateExtractionLabPatientBulk = async (data, id) => {
  try {
    var params = new URLSearchParams()
    params.append("requester", getUser())
    params.append("api_key", window.$api_key)
    params.append("token", getToken().replace(/['"]+/g, ""))
    const response = await postAPICall(
      window.$link + "bookings/updatelabExtraction",

      {
        updated_by: getUser(),
        api_key: window.$api_key,
        token: getToken().replace(/['"]+/g, ""),
        extracted_on: new Date(),
        // status: "done",
        booking: data.booking_id,
        lab_test_id: id,
      }
    )

    return { data: response.data }
  } catch (error) {
    return { error: error.response }
  }
}

export const skipPatient = async (queue_id) => {
  try {
    var params = new URLSearchParams()
    params.append("requester", getUser())
    params.append("api_key", window.$api_key)
    params.append("token", getToken().replace(/['"]+/g, ""))
    const response = await postAPICall(
      window.$link + "customers/skipQueue",

      {
        requester: getUser(),
        api_key: window.$api_key,
        token: getToken().replace(/['"]+/g, ""),
        queue_id: queue_id,
      }
    )

    return { data: response.data }
  } catch (error) {
    return { error: error.response }
  }
}

export const fetchBookingDetails = async (booking_id) => {
  try {
    var params = new URLSearchParams()
    params.append("requester", getUser())
    params.append("api_key", window.$api_key)
    params.append("token", getToken().replace(/['"]+/g, ""))
    const response = await postAPICall(
      window.$link + "bookings/getBookingDetails/" + booking_id,

      {
        requester: getUser(),
        api_key: window.$api_key,
        token: getToken().replace(/['"]+/g, ""),
      }
    )

    return { data: response.data }
  } catch (error) {
    return { error: error.response }
  }
}

export const getExtractionReport = async (data, department) => {
  try {
    var params = new URLSearchParams()
    params.append("requester", getUser())
    params.append("api_key", window.$api_key)
    params.append("token", getToken().replace(/['"]+/g, ""))
    const response = await postAPICall(
      window.$link + "reports/extraction",

      {
        api_key: window.$api_key,
        token: getToken().replace(/['"]+/g, ""),
        requester: getUser(),
        department: department,
        date_from: data.from_date,
        date_to: data.to_date
      }
    )

    return { data: response.data }
  } catch (error) {
    return { error: error.response }
  }
}
