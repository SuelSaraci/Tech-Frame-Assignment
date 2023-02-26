import React from "react";
import "../components/styles/Invoice.css";
function Invoice({ items }) {
  const highValueInvoices = []; // Array to store individual invoices
  const groupedItems = {}; // Object to store the quantity of each item
  const selectedMoreThan50 = {}; // Object to store items selected more than 50 times

  items.forEach((item) => {
    if (!groupedItems[item.name]) {
      groupedItems[item.name] = { ...item, quantity: 1 };
    } else {
      groupedItems[item.name].quantity++;
    }
    if (groupedItems[item.name].quantity > 50) {
      selectedMoreThan50[item.name] = groupedItems[item.name];
    }
    if (item.price > 500) {
      highValueInvoices.push(item); // Create a new invoice with just this item
    }
  });

  // Use the grouped items to calculate the net total and VAT amount
  const netTotal = Object.values(groupedItems)
    .filter((item) => item.price < 500)
    .reduce(
      (total, item) =>
        total + (item.price - (item.discount || 0)) * item.quantity,
      0
    );
  const vatAmount = Object.values(groupedItems)
    .filter((item) => item.price < 500)
    .reduce(
      (total, item) =>
        total +
        ((item.price - (item.discount || 0)) * item.quantity * item.vat) / 100,
      0
    );
  const grossTotal = netTotal + vatAmount;

  const rows = Object.values(groupedItems)
    .filter((item) => item.price < 500)
    .map((item, index) => {
      const discount = item.discount || 0;
      const netTotal = (item.price - discount) * item.quantity;
      const vatAmount = netTotal * (item.vat / 100);
      const total = netTotal + vatAmount;

      return (
        <tr key={index}>
          <td className="invoice-table-cell">{item.name}</td>
          <td className="invoice-table-cell">
            {item.quantity > 50 ? 50 : item.quantity}
          </td>
          <td className="invoice-table-cell">${item.price.toFixed(2)}</td>
          <td className="invoice-table-cell">-${discount.toFixed(2)}</td>
          <td className="invoice-table-cell">{item.vat}%</td>
          <td className="invoice-table-cell">
            $ {netTotal.toFixed(2)} + {vatAmount.toFixed(2)} ={" "}
            {total.toFixed(2)}
          </td>
        </tr>
      );
    });

  const renderHighValueInvoices = highValueInvoices.map((item, index) => {
    const discount = item.discount || 0;
    const netTotal = (item.price - discount) * 1;
    const vatAmount = netTotal * (item.vat / 100);
    const total = netTotal + vatAmount;
    return (
      <div key={index}>
        <table className="invoice-table">
          <thead>
            <tr>
              <th className="invoice-table-header">Item Name</th>
              <th className="invoice-table-header">Quantity</th>
              <th className="invoice-table-header">Price</th>
              <th className="invoice-table-header">Discount</th>
              <th className="invoice-table-header">VAT</th>
              <th className="invoice-table-header">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="invoice-table-cell">{item.name}</td>
              <td className="invoice-table-cell">1</td>
              <td className="invoice-table-cell">${item.price.toFixed(2)}</td>
              <td className="invoice-table-cell">-${discount.toFixed(2)}</td>
              <td className="invoice-table-cell">{item.vat}%</td>
              <td className="invoice-table-cell">
                $ {netTotal.toFixed(2)} + {vatAmount.toFixed(2)} ={" "}
                {total.toFixed(2)}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td
                style={{ textAlign: "right" }}
                colSpan="5"
                className="invoice-table-footer"
              >
                Net Total
              </td>
              <td className="invoice-table-footer">${netTotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td
                style={{ textAlign: "right" }}
                colSpan="5"
                className="invoice-table-footer"
              >
                VAT ({vatAmount.toFixed(2)}%)
              </td>
              <td
                style={{ textAlign: "right" }}
                className="invoice-table-footer"
              >
                ${vatAmount.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td
                style={{ textAlign: "right" }}
                colSpan="5"
                className="invoice-table-footer"
              >
                Gross Total
              </td>
              <td className="invoice-table-footer">${total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  });

  const renderSelectedMoreThan50 = Object.values(selectedMoreThan50).map(
    (item, index) => {
      const discount = item.discount || 0;
      const netTotal =
        (item.price - discount) *
        (item.quantity > 50 ? item.quantity - 50 : item.quantity);
      const vatAmount = netTotal * (item.vat / 100);
      const total = netTotal + vatAmount;

      return (
        <div key={index}>
          <table className="invoice-table">
            <thead>
              <tr>
                <th className="invoice-table-header">Item Name</th>
                <th className="invoice-table-header">Quantity</th>
                <th className="invoice-table-header">Price</th>
                <th className="invoice-table-header">Discount</th>
                <th className="invoice-table-header">VAT</th>
                <th className="invoice-table-header">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="invoice-table-cell">{item.name}</td>
                <td className="invoice-table-cell">
                  {item.quantity > 50 ? item.quantity - 50 : item.quantity}
                </td>
                <td className="invoice-table-cell">${item.price.toFixed(2)}</td>
                <td className="invoice-table-cell">-${discount.toFixed(2)}</td>
                <td className="invoice-table-cell">{item.vat}%</td>
                <td className="invoice-table-cell">
                  $ {netTotal.toFixed(2)} + {vatAmount.toFixed(2)} ={" "}
                  {total.toFixed(2)}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td
                  style={{ textAlign: "right" }}
                  colSpan="5"
                  className="invoice-table-footer"
                >
                  Net Total
                </td>
                <td className="invoice-table-footer">${netTotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td
                  style={{ textAlign: "right" }}
                  colSpan="5"
                  className="invoice-table-footer"
                >
                  VAT ({vatAmount.toFixed(2)}%)
                </td>
                <td className="invoice-table-footer">
                  ${vatAmount.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td
                  style={{ textAlign: "right" }}
                  colSpan="5"
                  className="invoice-table-footer"
                >
                  Gross Total
                </td>
                <td
                  style={{ textAlign: "right" }}
                  className="invoice-table-footer"
                >
                  ${total.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      );
    }
  );

  return (
    <div className="invoice-container">
      <h1>Invoice</h1>
      {rows.length > 0 && (
        <table className="invoice-table">
          <thead>
            <tr>
              <th className="invoice-table-header">Item Name</th>
              <th className="invoice-table-header">Quantity</th>
              <th className="invoice-table-header">Price</th>
              <th className="invoice-table-header">Discount</th>
              <th className="invoice-table-header">VAT</th>
              <th className="invoice-table-header">Total</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
          <tfoot>
            <tr>
              <td
                style={{ textAlign: "right" }}
                colSpan="5"
                className="invoice-table-footer"
              >
                Net Total
              </td>
              <td className="invoice-table-footer">${netTotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td
                style={{ textAlign: "right" }}
                colSpan="5"
                className="invoice-table-footer"
              >
                VAT ({vatAmount.toFixed(2)}%)
              </td>
              <td className="invoice-table-footer">${vatAmount.toFixed(2)}</td>
            </tr>
            <tr>
              <td
                style={{ textAlign: "right" }}
                colSpan="5"
                className="invoice-table-footer"
              >
                Gross Total
              </td>
              <td className="invoice-table-footer">${grossTotal.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      )}

      {renderHighValueInvoices.length > 0 && (
        <div>
          <h3>Invoice ( item has higher value than 500 )</h3>
          {renderHighValueInvoices}
        </div>
      )}
      {renderSelectedMoreThan50.length > 0 && (
        <div>
          <h3>Invoice ( item has been selected more than 50 times )</h3>
          {renderSelectedMoreThan50}
        </div>
      )}
    </div>
  );
}

export default Invoice;
