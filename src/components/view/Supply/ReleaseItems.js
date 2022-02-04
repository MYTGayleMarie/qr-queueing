import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { getToken, getUser } from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//css
import './ReleaseItems.css';

//components
import Searchbar from '../../Searchbar.js';
import Header from '../../Header.js';
import Navbar from '../../Navbar';
import Table from '../../Table.js';

const buttons = ['add-release'];
const userToken = getToken();
const userId = getUser();
var id;
var presentDate = new Date();
var formattedPresentData = presentDate.toISOString().split('T')[0];

const filterData = {
    from_date: formattedPresentData,
  
    to_date: formattedPresentData,
    done: false,
  };

function ReleaseItems() {
    const [releaseData, setReleaseData] = useState([]);
    const [filteredData, setFilter] = useForm(filterData);
    const [redirect, setRedirect] = useState(false);

    function review(releaseId) {
        id = releaseId;
        setRedirect(true);
    }

    React.useEffect(() => {
        releaseData.length = 0;
        axios({
          method: 'post',
          url: window.$link + 'releases/getAll',
          withCredentials: false,
          params: {
            api_key: window.$api_key,
            token: userToken.replace(/['"]+/g, ''),
            requester: userId,
            date_from: filteredData.from_date,
            date_to: filteredData.to_date,
          },
        })
          .then(function (response) {
            console.log(response);
            console.log(response.data.releases);
            response.data.releases.map((data,index) => {
                var info = {};
                info.id = data.id;
                info.items = "";
                info.requisitioner = "";
                info.grandTotal = data.grand_total;
                info.remarks = data.remarks;

                setReleaseData(oldArray => [...oldArray, info]);

            });
          })
          .catch(function (error) {
            console.log(error);
          });
      }, [filteredData]);

      if (redirect == true) {
        var link = '/review-release/' + id;
        return <Navigate to={link} />;
      }

    return (
        <div>
        <Navbar/>
        <div className="active-cont">
            <Fragment>
            <Searchbar title='RELEASE ITEMS'/>
            <Header 
                type='thick'
                title='SUPPLIES RELEASING MANAGER' 
                buttons={buttons} 
            />
            <Table
                type={'release'}
                clickable={true}
                tableData={releaseData}
                rowsPerPage={4}
                headingColumns={['ID','ITEMS', 'REQUISTIONER','GRAND TOTAL', 'REMARKS', 'ACTION']}
                filteredData={filteredData}
                setFilter={setFilter}
                link={review}
            />
            </Fragment>
        </div>
        </div>
    )
}

export default ReleaseItems
