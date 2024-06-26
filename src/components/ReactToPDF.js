import React from "react";
import "jspdf-autotable";
import jsPDF from "jspdf";
//image
import logo from "../images/logo-black.png";

function PdfTransaction({ type, name, data, header, total }) {
  var infos = [];

  data.map((info, index) => {
    infos.push(Object.values(info));
  });

  var saleInfos = [];
  if (type == "sales") {
    data.map((info, index) => {
      var saleDetails = Object.values(info);
      const cash = saleDetails.filter((info) => info.method == "cash");
      const card = saleDetails.filter((info) => info.method == "card");
      const check = saleDetails.filter((info) => info.method == "check");
      const others = saleDetails.filter((info) => info.method == "others");
      const credit = saleDetails.filter((info) => info.method == "credit");

      var saleTotal = {};
      saleTotal.dateTotal = saleDetails[0].date;
      saleTotal.total =
        "P " +
        info

          .map((data, key) => (key === 0 ? 0 : parseFloat(data.amount)))
          .reduce((a, b) => a + b, 0)
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      // "P "+parseFloat(saleDetails[0].amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      saleInfos.push(saleTotal);
      if (cash.length < 1) {
        var details = {
          date: "",
          method: "cash",
          account: "",
          amount: "",
        };
        saleInfos.push(details);
      }
      cash.map((cash, index) => {
        var details = {
          date: cash.date,
          method: "cash",
          account: cash.account,
          amount:
            "P " +
            parseFloat(cash.amount)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        };
        saleInfos.push(details);
      });
      if (card.length < 1) {
        var details = {
          date: "",
          method: "card",
          account: "",
          amount: "",
        };
        saleInfos.push(details);
      }
      card.map((card, index) => {
        var details = {
          date: card.date,
          method: "card",
          account: card.account,
          amount:
            "P " +
            parseFloat(card.amount)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        };
        saleInfos.push(details);
      });
      if (check.length < 1) {
        var details = {
          date: "",
          method: "check",
          account: "",
          amount: "",
        };
        saleInfos.push(details);
      }
      check.map((check, index) => {
        var details = {
          date: check.date,
          method: "check",
          account: check.account,
          amount:
            "P " +
            parseFloat(check.amount)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        };
        saleInfos.push(details);
      });
      if (others.length < 1) {
        var details = {
          date: "",
          method: "others",
          account: "",
          amount: "",
        };
        saleInfos.push(details);
      }
      others.map((others, index) => {
        var details = {
          date: others.date,
          method: "others",
          account: others.account,
          amount:
            "P " +
            parseFloat(others.amount)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        };
        saleInfos.push(details);
      });
      if (credit.length < 1) {
        var details = {
          date: "",
          method: "credits",
          account: "",
          amount: "",
        };
        saleInfos.push(details);
      }
      credit.map((credits, index) => {
        var details = {
          date: credits.date,
          method: "credits",
          account: "",
          amount:
            "P " +
            parseFloat(credits.amount)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        };
        saleInfos.push(details);
      });
    });
  }

  function salesPrint() {
    const doc = new jsPDF();
    var img = new Image();
    img.src = logo;
    doc.addImage(img, "png", 15, 13, 19, 9);
    doc.text(name, 35, 20);
    doc.autoTable({
      theme: "plain",
      margin: { top: 25 },
      columnStyles: { total: { fontStyle: "bold" } },
      head: [header],
      body: saleInfos.concat({ dateTotal: "GRAND TOTAL", total: total }),
      columns: [
        { header: "DATE", dataKey: "dateTotal" },
        { header: "METHOD", dataKey: "method" },
        { header: "ACCOUNT", dataKey: "account" },
        { header: "AMOUNT", dataKey: "amount" },
        { header: "TOTAL", dataKey: "total" },
      ],
    });
    doc.save(name + ".pdf");
  }

  function print() {
    const doc = new jsPDF();
    var img = new Image();
    img.src = logo;
    doc.addImage(img, "png", 15, 13, 19, 9);
    doc.text(name, 35, 20);
    doc.autoTable({
      theme: "plain",
      margin: { top: 25 },
      head: [header],
      body: infos,
    });

    doc.save(name + ".pdf");
  }

  if (type == "sales") {
    return (
      <button className="download" onClick={salesPrint}>
        EXPORT PDF
      </button>
    );
  }
  return (
    <button className="download" onClick={print}>
      EXPORT PDF
    </button>
  );
}

export default PdfTransaction;
