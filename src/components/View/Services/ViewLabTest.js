import React, { Fragment, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { Navigate } from "react-router-dom"
import { getToken, getUser } from "../../../utilities/Common"
import { ToastContainer, toast } from "react-toastify"
import { Modal } from "react-bootstrap"
import "react-toastify/dist/ReactToastify.css"

//css
import "./ViewLabTest.css"

//components
import Navbar from "../../Navbar"
import Header from "../../Header.js"
import Table from "../../Table.js"

//constants
const buttons = ["edit-lab-test", "delete-lab-test"]
const userToken = getToken()
const userId = getUser()

export default function ViewLabTest() {
  //category choices
  const [categoryOptions, setCategoryOptions] = useState([])

  //lab test info
  const { id } = useParams()
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [hmoPrice, setHmoPrice] = useState("")
  const [remarks, setRemarks] = useState("")

  //Edit
  const [editName, setEditName] = useState("")
  const [editCategoryId, setEditCategoryId] = useState("")
  const [editCategoryName, setEditCategoryName] = useState("")
  const [editPrice, setEditPrice] = useState("")
  const [editHmoPrice, setEditHmoPrice] = useState("")
  const [editRemarks, setEditRemarks] = useState("")

  //Edit Lab test modal
  const [labTestShow, setLabTestShow] = useState(false)
  const handleLabTestClose = () => setLabTestShow(false)
  const handleLabTestShow = () => setLabTestShow(true)

  //redirect
  const [redirect, setRedirect] = useState(false)

  //Fetch single lab test details
  React.useEffect(() => {
    axios({
      method: "post",
      url: window.$link + "lab_tests/show/" + id,
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
      },
    })
      .then((response) => {
        setName(response.data.name)
        setPrice(response.data.price)
        setHmoPrice(response.data.hmo_price)
        setRemarks(response.data.remarks)

        setEditName(response.data.name)
        setEditPrice(response.data.price)
        setEditHmoPrice(response.data.hmo_price)
        setEditRemarks(response.data.remarks)
        setEditCategoryId(response.data.category_id)

        axios({
          method: "post",
          url: window.$link + "categories/show/" + response.data.category_id,
          withCredentials: false,
          params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ""),
            requester: userId,
          },
        }).then((response) => {
          setCategory(response.data.name.toLowerCase())

          setEditCategoryName(response.data.name.toLowerCase())
        })
      })
      .catch((error) => {})
  }, [])

  //Fetch all categories option
  React.useEffect(() => {
    categoryOptions.length = 0
    axios({
      method: "post",
      url: window.$link + "categories/getAll",
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
      },
    })
      .then((response) => {
        const resCategories = response.data.categories
          .filter((test) => test.is_deleted != 1)
          .sort((x, y) => x.id - y.id)
        resCategories.map((data, index) => {
          var info = {}
          info.id = data.id
          info.name = data.name.toLowerCase()
          setCategoryOptions((oldArray) => [...oldArray, info])
        })
      })
      .catch((error) => {})
  }, [])

  //sort category alphabetically
  React.useEffect(() => {
    categoryOptions.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    )
  }, [categoryOptions])

  // submit delete request
  function deleteLabTest() {
    axios({
      method: "post",
      url: window.$link + "lab_tests/delete/" + id,
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        updated_by: userId,
      },
    })
      .then(function (response) {
        toast.success("Successfully deleted")
        setTimeout(function () {
          setRedirect(true)
        }, 2000)
      })
      .then(function (error) {})
  }

  //submit edit request
  function editLabTest(e) {
    e.preventDefault()

    axios({
      method: "post",
      url: window.$link + "lab_tests/update/" + id,
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        name: editName,
        category: editCategoryId,
        price: editPrice,
        hmo_price: editHmoPrice,
        remarks: editRemarks,
        updated_by: userId,
      },
    })
      .then((response) => {
        toast.success("Successfully updated lab test!")
        handleLabTestClose()
        setTimeout(function () {
          setRedirect(true)
        }, 2000)
      })
      .catch((error) => {})
  }

  if (redirect == true) {
    return <Navigate to="/services" />
  }

  return (
    <div>
      <Navbar />
      <div className="active-cont">
        <Fragment>
          <Header
            type="thick"
            title="SERVICES - LAB TESTS"
            buttons={["delete-lab-test", "edit-lab-test"]}
            editLabTest={handleLabTestShow}
            deleteLabTest={deleteLabTest}
          />
          <ToastContainer />
          <h4 className="form-categories-header italic">LAB TEST DETAILS</h4>
          <table className="personal-data-cont">
            <tr>
              <td className="first-name label">NAME</td>
              <td className="first-name detail">{name}</td>
            </tr>
            <tr>
              <td className="first-name label">CATEGORY</td>
              <td className="first-name detail category">{category}</td>
            </tr>
            <tr>
              <td className="first-name label">PRICE</td>
              <td className="first-name detail">P {price}</td>
            </tr>
            <tr>
              <td className="first-name label">HMO PRICE</td>
              <td className="first-name detail">P {hmoPrice}</td>
            </tr>
            <tr>
              <td className="first-name label">REMARKS</td>
              <td className="first-name detail">{remarks}</td>
            </tr>
          </table>
          <Modal show={labTestShow} onHide={handleLabTestClose} size="md">
            <Modal.Header closeButton className="text-center">
              <Modal.Title className="w-100 cash-count-header">
                EDIT LAB TEST
              </Modal.Title>
            </Modal.Header>
            <form>
              <Modal.Body>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="label text-left">NAME</div>
                      </div>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          name="name"
                          className="form-control w-100"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="label text-left">CATEGORY</div>
                      </div>
                      <div className="col-sm-8">
                        <select
                          className="form-select"
                          id="category_id"
                          name="category_id"
                          value={editCategoryId}
                          onChange={(e) => setEditCategoryId(e.target.value)}
                        >
                          {categoryOptions.map((option, index) => (
                            <option className="category" value={option.id}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="label text-left">PRICE</div>
                      </div>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          name="price"
                          className="form-control w-100"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="label text-left">HMO PRICE</div>
                      </div>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          name="hmo_price"
                          className="form-control w-100"
                          value={editHmoPrice}
                          onChange={(e) => setEditHmoPrice(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="label text-left">REMARKS</div>
                      </div>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          name="remarks"
                          className="form-control w-100"
                          value={editRemarks}
                          onChange={(e) => setEditRemarks(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button
                  type="submit"
                  className="save-btn"
                  onClick={(e) => editLabTest(e)}
                >
                  SAVE
                </button>
              </Modal.Footer>
            </form>
          </Modal>
        </Fragment>
      </div>
    </div>
  )
}
