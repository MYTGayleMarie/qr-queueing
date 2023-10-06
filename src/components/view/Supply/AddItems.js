import React, { useState } from "react"
import axios from "axios"
import { Navigate } from "react-router-dom"
import { getToken, getUser, removeUserSession } from "../../../utilities/Common"
import { useForm } from "react-hooks-helper"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Select from "react-select"

//css
import "./AddItems.css"

//components
import Header from "../../Header.js"
import Navbar from "../../Navbar"

//variables
const userToken = getToken()
const userId = getUser()

function AddItems() {
  //style
  document.body.style = "background: white;"

  //states
  const ItemData = {
    date: "",
    requisitioner: "",
    remarks: "",
  }

  const [info, setInfo] = useForm(ItemData)
  const [itemInfo, setItemInfo] = useState([])
  const [items, setItems] = useState([
    {
      quantity: "",
      unit: "",
      item: "",
    },
  ])

  const [existingItems, setRemoveItems] = useState(items)
  const [redirect, setRedirect] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [selectedItem, setSelectedItem] = useState([])
  const handleItemChange = (e, index) => {
    const { name, value } = e.target
    const list = [...items]
    list[index][name] = value

    if (name == "item") {
      itemInfo.map((data, i) => {
        if (data.id == value) {
          list[index]["cost"] = data.cost
          list[index]["unit"] = data.unit
        }
      })
    }

    setItems(list)
    console.log(items)
  }
  const handleSelectedItemChange = (e, index) => {
   console.log("sleected", e)
    const list = [...items]
    list[index]["item"] = e.value

   
      itemInfo.map((data, i) => {
        if (data.id == e.value) {
          list[index]["cost"] = e.cost
          list[index]["unit"] = e.unit
        }
      })
    

    setItems(list)
    console.log(items)
  }

  const addItems = () => {
    setItems([
      ...items,
      {
        quantity: "",
        unit: "",
        item: "",
      },
    ])
  }

  const removeItems = (index) => {
    const list = [...items]
    list.splice(index, 1)
    setItems(list)
    console.log(items)
  }

  //API get items

  React.useEffect(()=>{
    console.log(selectedItem)
  },[selectedItem])
  React.useEffect(() => {
    axios({
      method: "post",
      url: window.$link + "items/getAll",
      withCredentials: false,
      params: {
        api_key: window.$api_key,
        token: userToken.replace(/['"]+/g, ""),
        requester: userId,
      },
    })
      .then(function (response) {
        response.data.items.map((data, index) => {
          if (data.item_id != "0" || data.is_deleted == 1) {
            var itemInfo = {}
            itemInfo.id = data.item_id
            itemInfo.name = data.item_name
            itemInfo.unit = data.default_unit
            itemInfo.cost = data.cost
            itemInfo.label = data.item_name
            itemInfo.value = data.item_id
            setItemInfo((oldArray) => [...oldArray, itemInfo])
          }
        })
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  //API submit call
  function submit(e) {
    console.log(items)

    e.preventDefault()

    var item_ids = []
    var costs = []
    var qty = []
    var units = []

    items.map((data, index) => {
      item_ids.push(data.item)
      costs.push(data.cost)
      qty.push(data.quantity)
      units.push(data.unit)
    })

    if (isClicked == false) {
      setIsClicked(true)
      axios({
        method: "post",
        url: window.$link + "releases/create",
        withCredentials: false,
        params: {
          api_key: window.$api_key,
          token: userToken.replace(/['"]+/g, ""),
          release_date: info.date,
          requisitioner: info.requisitioner,
          remarks: info.remarks,
          items: item_ids,
          cost: costs,
          qty: qty,
          unit: units,
          added_by: userId,
        },
      })
        .then(function (response) {
          if(response.data.status === 400){
Object.values(response.data.message[0]).map(data=>
  toast.error(data))
          
          }
          if(response.data.status === 200 || response.data.status === 201){
          toast.success("Successfully added releasing items!")
            setTimeout(function () {
            setRedirect(true)
          }, 2000)
          }
          console.log("response",response)
          console.log("response 2",Object.values(response.data.message[0]))

        
        })
        .then(function (error) {
          console.log("error",error)
        })
    }
  }

  var purchaseItems = items.map((row, index) => {
    return (
      <tr key={index}>
        <td width={300}>
          <div className="input-group input-group-md">
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={row.order_quantity}
              onChange={(e) => handleItemChange(e, index)}
              className="form-control qty"
              style={{ width: "80%" }}
            />
          </div>{" "}
        </td>
        <td width={300}>
          <div className="input-group input-group-md">
            <input
              type="text"
              name="unit"
              id="unit"
              value={row.unit}
              className="form-control qty"
              style={{ width: "80%" }}
              readOnly
            />
          </div>
        </td>

        <td width={400}>
          <Select
            isSearchable
            defaultValue={selectedItem}
            onChange={(e)=>handleSelectedItemChange(e,index)}
            options={itemInfo}
          />
        </td>
      </tr>
    )
  })

  //redirect
  if (redirect == true) {
    return <Navigate to="/release-item" />
  }

  console.log(info)

  return (
    <div>
      <Navbar />
      <div style={{marginLeft:"230px"}}>
        <Header type="thin" title="ADD ITEMS" />
        <ToastContainer />
        <h4 className="po-header">ITEM DETAILS</h4>
        <form>
          <div className="item-details-cont">
            <div className="row mb-2">
              <div className="col-sm-3 pt-1">
                <span className="item-id-label">DATE</span>
              </div>
              <div className="col-sm-7">
                <div className="input-group input-group-sm">
                  <input
                    type="date"
                    name="date"
                    className="form-control"
                    onChange={setInfo}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3 pt-2">
                <span className="item-id-label">REQUISITIONER</span>
              </div>
              <div className="col-sm-7">
                <select
                name="requisitioner"
                  class="form-select form-select-sm"
                  aria-label="Small select example"
                  onChange={setInfo}

                >
                  <option value="Admin">Admin</option>
                  <option value="Laboratory">Laboratory</option>
                  <option value="Reception">Reception</option>
                  <option value="XRAY">Xray</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3 pt-2">
                <span className="item-name-label">REMARKS</span>
              </div>
              <div className="col-sm-7">
                <div class="form-floating mt-1">
                  <textarea
                    className="form-control w-100"
                    placeholder="Leave a comment here"
                    id="floatingTextarea"
                    name="remarks"
                    // rows="4"
                    // cols="40"
                    onChange={setInfo}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
      
        </form>
        {/************************ */}
        <div  style={{zIndex:"2"}}>
          <div className="table-container-items">
            <div className="search-table-container d-flex justify-content-end">
              {" "}
            </div>
            <table className="table-container__table">
              <thead>
                <tr>
                  <th> Quantity</th>
                  <th>Unit</th>
                  <th>Item</th>
                </tr>
              </thead>
              <tbody>{purchaseItems}</tbody>
            </table>

            <div className="add-item-cont">
              <button className="add-items-btn" onClick={addItems}>
                ADD ITEM
              </button>
               {items.length !== 1 && (
            <button className="delete-items-btn" onClick={removeItems}>
              REMOVE ITEM
            </button>
          )}
            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-end">
        
         
          <button className="save-items-btn" onClick={(e) => submit(e)}>
            SAVE
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddItems

