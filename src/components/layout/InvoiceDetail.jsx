import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableCell, TableRow, Typography, Button } from '@mui/material';
import '../../assets/invoiceDetails.css'; 
import Logo from '../BrandLogo';
import PaymentConfirmation from './PaymentConfirmation';


const InvoiceDetail = ({ invoiceId, onClose }) => {
  const [invoice, setInvoice] = useState(null);
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/api/invoices/${invoiceId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setInvoice(response.data.invoice);
      } catch (error) {
        console.error('Error fetching invoice:', error);
      }
    };

    fetchInvoice();
  }, [invoiceId]);
  
  if (!invoice) {
    return <div className="loadingPane">Loading...</div>;
  }
  const handleMakePayment = () => {
    setShowPaymentConfirmation(true);
  };

  const handleClosePaymentConfirmation = () => {
    setShowPaymentConfirmation(false);
  };

  return (
    <div className="invoiceDetailContainer">
      <div className='invoiceLogo'>
          <Logo />
          <h4>Cribaap</h4>
      </div>
        <button onClick={onClose} className="close-button">Close</button>
        <h2>Invoice Details</h2>
      <div className='invoiceHeader'>
        <div className='invoiceLeft'>
          <p><strong>TO:</strong></p>
          <p><strong>Tenant Name:</strong> {invoice.tenant.firstName} {invoice.tenant.middleName} {invoice.tenant.lastName}</p>
          <p><strong>Property Title:</strong> {invoice.property.property_title}</p>
          <p><strong>Unit Number:</strong> {invoice.unitNumber}</p>
          <p><strong>Room Number:</strong> {invoice.roomNumber}</p>
        </div>
        <div className='invoiceRight'>
          <p><strong>Invoice Number:</strong> <span className='invoiceNumber'>{invoice.invoiceNumber}</span></p>
          <p><strong>Created At:</strong> {new Date(invoice.createdAt).toLocaleDateString()}</p>
          <p><strong>Status:</strong> <span className='invoiceStatus'>{invoice.status}</span></p>
          <p><strong>Due Date:</strong> {new Date(invoice.dueDate).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="invoiceDetail">
        <Table className='invoiveTable'>
          <TableHead>
            <TableCell></TableCell>
            <TableCell><strong>Amount</strong></TableCell>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Current Rent Amount</TableCell>
              <TableCell>{invoice.amount}.00/=</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Water Bill</TableCell>
              <TableCell>0.00/=</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Electricity Bill</TableCell>
              <TableCell>0.00/=</TableCell>
            </TableRow>
            <TableRow></TableRow>
            <TableRow>
              <TableCell><strong>Total</strong></TableCell>
              <TableCell className='tableCell'><strong>{invoice.amount}.00/=</strong></TableCell>
            </TableRow>
          </TableBody>
        </Table>     
      </div>
      <button className='make-payment' onClick={handleMakePayment}>Make Payment</button>
       {/* Render payment confirmation if showPaymentConfirmation is true */}
       {showPaymentConfirmation && (
        <PaymentConfirmation 
          invoiceId={invoiceId} 
          onClose={handleClosePaymentConfirmation} 
        />
      )}
    </div>
  );
};

export default InvoiceDetail;
