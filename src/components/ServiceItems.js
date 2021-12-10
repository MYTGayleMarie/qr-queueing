import React from 'react';

const clincalMicroscopy = [
    {
        name: 'Urinalysis',
        categoryId: '1',
        labTestId: '1', 
        price: '70'
    },    
    {
        name: 'Urine Ketone',
        categoryId: '1',
        labTestId: '2', 
        price: '70'
    },  
    {
        name: 'Urine RBC Morphology',
        categoryId: '1',
        labTestId: '3', 
        price: '150'
    },  
    {
        name: 'Fecalysis',
        categoryId: '1',
        labTestId: '4', 
        price: '50'
    },  
    {
        name: 'Fecal Occult Blood',
        categoryId: '1',
        labTestId: '5', 
        price: '350'
    },  
    {
        name: 'Pregnancy Test (RPK-Lateral Flow)',
        categoryId: '1',
        labTestId: '6', 
        price: '140'
    },  
    {
        name: 'Sperm Analysis',
        categoryId: '1',
        labTestId: '7', 
        price: '350'
    },  
];

function ServiceItems({category, formData, setForm, navigation }) {

    if(category === 'CLINICAL MICROSCOPY') {
        var categoryData = clincalMicroscopy;
    }

    const {clinicalServices} = formData;
    console.log(clinicalServices)

    const itemData = categoryData.map((row, index) => {
        return(
            <div className="row">
                <div className="col-sm-6">
                    <input type="checkbox" id={row.categoryId} name={row.name} onChange={setForm}/><label for={row.name} className="service-item">{row.name}</label>
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
