import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { getToken, getUser } from '../../../utilities/Common';
import { useForm } from 'react-hooks-helper';
import { Navigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import useTable from '../../../utilities/Pagination';
import TableFooter from '../../TableFooter';
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

function ReleaseItems() {
  
    document.body.style = 'background: white;';
    const {dateFrom, dateTo} = useParams();
    const [releaseData, setReleaseData] = useState([]);
    const [filteredData, setFilter] = useForm({
      from_date: dateFrom ? dateFrom : formattedPresentData,
      to_date: dateTo ? dateTo : formattedPresentData,
      done: false,
    });
    const [redirect, setRedirect] = useState(false);
    const [render, setRender] = useState([]);
    const [isReady, setIsReady] = useState(false)

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
                axios({
                    method: 'post',
                    url: window.$link + 'releases/getReleasingItems/' + data.id,
                    withCredentials: false,
                    params: {
                      api_key: window.$api_key,
                      token: userToken.replace(/['"]+/g, ''),
                      requester: userId,
                    },
                  }).then(function (response) {
                        var items = "";
                        response.data.map((info,index) => {
                            if(info.item != null && index != response.data.length - 1) {
                                items += info.item + ", ";
                            }else{
                                items += info.item;
                            }
                        });
                        var info = {};
                        info.id = data.id;        
                        info.items = items;
                        info.requisitioner = data.requisitioner;
                        info.grandTotal ="P " + data.grand_total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
                        info.remarks = data.remarks;
                        console.log(data);
                        setReleaseData(oldArray => [...oldArray, info]);
                  })
                  .then(function (error) {
                      console.log(error);
                      setIsReady(true)
                  })
            });
          })
          .catch(function (error) {
            console.log(error);
            setIsReady(false)
          });
      }, [render]);

      if (redirect == true) {
        var link = '/review-release/' + id + "/" + filteredData.from_date + "/" + filteredData.to_date;
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
                tableData={releaseData.sort((a,b) => (a.id > b.id ? 1 : ((b.id > a.id) ? -1 : 0)))}
                rowsPerPage={4}
                headingColumns={['ID','ITEMS', 'REQUISTIONER','GRAND TOTAL', 'REMARKS', 'ACTION']}
                filteredData={filteredData}
                setRender={setRender}
                render={render}
                setFilter={setFilter}
                link={review}
                useLoader={true}
                isReady={isReady}
            />
            </Fragment>
        </div>
        </div>
    )
}

export default ReleaseItems
