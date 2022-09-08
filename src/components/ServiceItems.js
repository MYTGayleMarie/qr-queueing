import React from 'react';


function ServiceItems({category, items, formData, setForm}) {
    // console.log(items)
    const itemData = items.map((row, index) => {
    // console.log(formData)
        return(
            <div className="row">
                <div className="col-sm-6">
                    <input type="checkbox" class={row.categoryId} id={row.labTestId} name={row.key} checked={eval("formData." + row.key)} onChange={setForm}/><label for={row.name} className="service-item">{row.name}</label>
                </div>
                <div className="col-sm-6 d-flex justify-content-end">
                    <span className="price">P {parseFloat(row.price).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}</span>
                </div>
            </div>
        )
    });

    return (
        <div>
            <h2 className="form-categories-sub-header italic">{category}</h2>

             {itemData}

        </div>
    )
}

export default ServiceItems
