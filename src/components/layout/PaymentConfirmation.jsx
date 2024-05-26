import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/paymentConfirmation.css'; 

const PaymentConfirmation = ({ invoiceId, onClose }) => {
  const [invoice, setInvoice] = useState(null);
  const [paymentType, setPaymentType] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');

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

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

  const handleReferenceNumberChange = (event) => {
    setReferenceNumber(event.target.value);
  };

  const handlePaymentConfirmation = () => {
    // Implement the payment processing logic here
    console.log('Payment confirmed with the following details:');
    console.log('Payment Type:', paymentType);
    console.log('Reference Number:', referenceNumber);
    // Close the confirmation dialog
    onClose();
  };

  if (!invoice) {
    return <div className="loadingPane">Loading...</div>;
  }

  return (
    <div className="paymentConfirmationContainer">
      <h2>Payment Confirmation</h2>
      <p><strong>Tenant Name:</strong> <span className='tenantName'>{invoice.tenant.firstName} {invoice.tenant.middleName} {invoice.tenant.lastName}</span></p>
      <p><strong>Room Number:</strong> {invoice.roomNumber}</p>
      <p><strong>Amount to be Paid:</strong> <span className='rentAmount'>{invoice.amount}.00/=</span></p>
      <div>
        <label htmlFor="paymentType">Payment Type:</label>
        <select id="paymentType" value={paymentType} onChange={handlePaymentTypeChange}>
          <option value="">Select Payment Type</option>
          <option value="cash">Cash</option>
          <option value="bank_transfer">Bank Transfer</option>
          <option value="mobile_payment">Mobile Payment</option>
        </select>
      </div>
      {paymentType === 'bank_transfer' || paymentType === 'mobile_payment' ? (
        <div>
          <label htmlFor="referenceNumber">Reference Number:</label>
          <input 
            id="referenceNumber" 
            type="text" 
            value={referenceNumber} 
            onChange={handleReferenceNumberChange} 
            placeholder="Enter Reference Number"
          />
        </div>
      ) : null}
      <button onClick={handlePaymentConfirmation} className="confirm-button">Confirm Payment</button>
      <button onClick={onClose} className="close-button">Close</button>
    </div>
  );
};

export default PaymentConfirmation;
