import React from "react";
import { render } from "react-dom";
import { renderToString } from "react-dom/server";
import 'jspdf-autotable';
import jsPDF from "jspdf";

//image
import logo from '../images/logo-black.png';

function PdfTransaction({name, data, header}) {

    var infos = [];

    data.map((info, index) => {
        infos.push(Object.values(info));
    });

    function print() {
        const doc = new jsPDF();
        var img = new Image();
        img.src = logo;
        doc.addImage(img, 'png', 15, 13, 19, 9);
        doc.text(name, 35, 20);
        doc.autoTable({
            theme: "plain",
            margin: { top: 25 },
            head: [header],
            body: infos, 
          })

        doc.save(name + '.pdf')
    }


  return (
        <button className="download" onClick={print}>EXPORT PDF</button>
  )
}

export default PdfTransaction