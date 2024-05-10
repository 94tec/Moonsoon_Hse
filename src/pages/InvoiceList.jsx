import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using Axios for HTTP requests
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../assets/invoice.css';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    const fetchInvoices = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/invoices', {
          headers: {
              Authorization: `Bearer ${token}`
          }
      }); // Adjust the API endpoint accordingly
        setInvoices(response.data.invoices); // Update the state with the fetched invoices
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    fetchInvoices();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className="invoiceListContainer">
      <div className="invoiceListTopNavigator">
        <div className="searchBar">
          <input type="text" placeholder="Enter Invoice Number to search..." />
          <FontAwesomeIcon icon={faSearch}  className='fa-search'/>
        </div>
      </div>
      <div className="invoiceListArea">
        <h2>Invoice List</h2>
        <ul className="invoice-list-container">
          {/* Header */}
          <li className="invoice-list-item invoice-header">
            <div className="invoice-item0">
              <p>Invoice Number</p>
              <p className="tenant">Tenant</p>
              <p className="property_title">Property Title</p>
              <p>Unit Number</p>
              <p>Room Number</p>
              <p>Due Date</p>
              <p>Amount</p>
              <p>Status</p>
              <p className="createdAt">Created At</p>
              <p>Action</p> 
            </div>
          </li>
          {/* Content */}
          {invoices.map((invoice) => (
            <li key={invoice._id} className="invoice-list-item">
              <div className="invoice-item">
                <p>{invoice.invoiceNumber}</p>
                <p className="tenant">{invoice.tenant.firstName} {invoice.tenant.middleName} {invoice.tenant.lastName}</p>
                <p className="property_title">{invoice.property.property_title}</p>
                <p>{invoice.unitNumber}</p>
                <p>{invoice.roomNumber}</p>
                <p>{new Date(invoice.dueDate).toLocaleDateString()}</p>
                <p>{invoice.amount}.00/=</p>
                <p className="unpaidStatus">{invoice.status}</p>
                <p>{new Date(invoice.createdAt).toLocaleDateString()}</p>
                <button className="view-button">View</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  
};

export default InvoiceList;
