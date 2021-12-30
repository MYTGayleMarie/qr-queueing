import React from 'react';


function ServiceItems({category, items, setForm}) {

    const itemData = items.map((row, index) => {

        return(
            <div className="row">
                <div className="col-sm-6">
                    <input type="checkbox" class={row.categoryId} id={row.labTestId} name={row.key} onChange={setForm}/><label for={row.name} className="service-item">{row.name}</label>
                </div>
                <div className="col-sm-6 d-flex justify-content-end">
                    <span className="price">P {row.price}</span>
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
