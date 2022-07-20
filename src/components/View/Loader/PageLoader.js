import React from 'react'

function TableLoader({tableHeaders  }) {


  return (
        <>
            <tr>
                {tableHeaders.map((data,index) => {
                    return  <td class="total-count-header-table"><span></span></td>
                })}
            </tr>
            <tr>
            {tableHeaders.map((data,index) => {
                return  <td class="total-count-header-table"><span></span></td>
            })}
            </tr>
            <tr>
            {tableHeaders.map((data,index) => {
                return  <td class="total-count-header-table"><span></span></td>
            })}
            </tr>
            <tr>
            {tableHeaders.map((data,index) => {
                return  <td class="total-count-header-table"><span></span></td>
            })}
            </tr>
            <tr>
            {tableHeaders.map((data,index) => {
                return  <td class="total-count-header-table"><span></span></td>
            })}
            </tr>
            <tr>
            {tableHeaders.map((data,index) => {
                return  <td class="total-count-header-table"><span></span></td>
            })}
            </tr>
        </>
  )
}

export default TableLoader