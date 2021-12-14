import React from 'react';


function ServiceItems({category, items,  formData, setForm}) {


    //ALL SERVICES
    const {
        //CLINICAL MICROSCOPY
        Urinalysis1,
        UrineKetone1,
        UrineRBCMorphology1,
        Fecalysis1,
        FecalOccultBlood1,
        PregnancyTest1,
        SpermAnalysis1,
    } = formData;

    const itemData = items.map((row, index) => {
        row.name = row.name.replace(/[{()}]|,|-|\/|\s+/g, '');
        var itemValue = false;
        switch(row.name) {
            case "Urinalysis":
                itemValue = Urinalysis1;
                break;
            case "UrineKetone":
                itemValue = UrineKetone1;
                break;
            case "UrineRBCMorphology":
                itemValue = UrineRBCMorphology1;
                break;
            case "Fecalysis":
                itemValue = Fecalysis1;
                break;
            case "FecalOccultBlood":
                itemValue = FecalOccultBlood1;
                break;
            case "PregnancytestRPKLateralFlow":
                itemValue = PregnancyTest1;
                break;
            case "SpermAnalysis":
                itemValue =SpermAnalysis1;
                break;   
        }
   
        return(
            <div className="row">
                <div className="col-sm-6">
                    <input type="checkbox" class={row.categoryId} id={row.labTestId} name={row.key} checked={itemValue} onChange={setForm}/><label for={row.name} className="service-item">{row.name}</label>
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
