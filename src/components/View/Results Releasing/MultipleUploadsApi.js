import { getAPICall, postAPICall, putAPICall, deleteAPICall } from '../axiosMethodCalls';
import { getToken, getUser } from '../../../utilities/Common';

/***************************
 * Loyalty Type
 ***************************/

const user = getUser();
const token = getToken();

//POST
// export const getAllLoyaltyTypes = async () => {

//     try {
//         const response = await postAPICall(process.env.REACT_APP_LINK + 'loyalty_types/get', {
//             requester: user,
//             token: token,
//         });
//         console.log("get API")
//         console.log(response)
//         return ({data:response.data.data});   
//     } catch (error) {
//         return ({error: error.response});
//     }
// }

// export const getLoyaltyTypeId = async (id) => {
//     try {
//         const response = await postAPICall(process.env.REACT_APP_LINK + 'loyalty_types/get', {
//             requester: user,
//             token: token,
//             loyalty_type_id: id,
//         });

//         console.log("getLoyaltyTypeId")
//         console.log(response)
//         return ({data:response});   
//     } catch (error) {
//         return ({error: error.response});
//     }
// }

export const createMultipleUploads = async (data, attachments) => {

    var attachmentsData = [];

    attachments.map((data) => {
        if(data.type !== "") { //if one input is empty do no include it in the array
            attachmentsData.push(data.type);
        }
    })

    //TEST
    // console.log(subTypesData);


    try {
        const response = await postAPICall(process.env.REACT_APP_LINK + 'api/Bookingpackage_details/uploadResults/${$id}', {
            requester: user,
            token: token,
            name: data.name,
            attachments: attachmentsData.join("^"), //comma separated values
        });
        return ({data:response});   
    } catch (error) {
        return ({error: error.response});
    }
}

// export const updateLoyaltyType = async (id, data, subtypes) => {

//     var subTypesData = [];

//     subtypes.map((data) => {
//         if(data.type !== "") { //if one input is empty do no include it in the array
//             subTypesData.push(data.type);
//         }
//     })


//     try {
//         const response = await postAPICall(process.env.REACT_APP_LINK + 'loyalty_types/update', {
//             requester: user,
//             token: token,
//             loyalty_type_id: id,
//             name: data.loyalty_type,
//             loyalty_subs: subTypesData.join("^"), 
//         });
//         return ({data:response});   
//     } catch (error) {
//         return ({error: error.response});
//     }
// }

// export const deleteLoyaltyType = async (id) => {
//     try {
//         const response = await postAPICall(process.env.REACT_APP_LINK + 'loyalty_types/delete', {
//             requester: user,
//             token: token,
//             loyalty_type_id: id,
//         });
//         return ({data:response});   
//     } catch (error) {
//         return ({error: error.response});
//     }
// }

// export const searchLoyaltyType = async (data) => {
//     try {
//         const response = await postAPICall(process.env.REACT_APP_LINK + 'loyalty_types/search', {
//             requester: user,
//             token: token,
//             status: data.status,
//             name: data.name,
//         });
//         return ({data:response.data.data});   
//     } catch (error) {
//         return ({error: error.response});
//     }
// }









