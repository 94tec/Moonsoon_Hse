// RoomForm.jsx

import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const RoomForm = ({ onClose, onSubmit, isOpen }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const handleClose = () => {
    onClose();
  };

  const handleFormSubmit = async (data) => {
    try {
      await axios.post('/api/rooms', data); // Adjust the endpoint as needed
      onSubmit(data);
      reset(); // Clear the form fields
    } catch (error) {
      console.error('Error submitting room:', error);
    }
  };

  return (
    <div className={`add_room_container ${isOpen ? 'open' : ''}`}>
      <h2>Add Rooms</h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} className='add_room_form'>
        <div>
        <div className='row'>
            <label htmlFor="roomNumber">Room Number:</label>
            <input type="number" id="roomNumber" {...register('roomNumber', { required: true })} />
        </div>
          {errors.roomNumber && <span>Room number is required</span>}
        </div>
        <div>
        <div className='row'>
            <label htmlFor="roomCategory">Room Category:</label>
            <select className='roomCategory' id="roomCategory" {...register('roomCategory', { required: true })}>
              <option value="">Select Room Category</option>
              <option value="Single">Single Room</option>
              <option value="Double">Double Room</option>
              <option value="Suite">Bed Sitter</option>
              <option value="Suite">One Bed Room</option>
              <option value="Suite">2 Bed Rooms</option>
              <option value="Suite">3 Bed Rooms</option>
              {/* Add more options as needed */}
            </select>
          </div>
          {errors.roomCategory && <span>Room category is required</span>}
        </div>
        <div>
        <div className='row'>
            <label htmlFor="pricePerRent">Price Per Rent:</label>
            <input type="number" id="pricePerRent" {...register('pricePerRent', { required: true })} />
        </div>
          {errors.pricePerRent && <span>Price per rent is required</span>}
        </div>
        <div>
            <div className='row'>
                <label htmlFor="depositRequired">Deposit Required:</label>
                <input type="number" id="depositRequired" {...register('depositRequired', { required: true })} />
            </div>
          {errors.depositRequired && <span>Deposit required is required</span>}
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleClose}>Cancel</button>
      </form>
    </div>
  );
};

export default RoomForm;
