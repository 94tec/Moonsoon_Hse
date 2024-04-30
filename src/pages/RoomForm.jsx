import React, { useState, useEffect  } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const RoomForm = ({ onClose, propertyId }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [property, setProperty] = useState('');
  const [rooms, setRooms] = useState([]);

  const handleClose = () => {
    onClose();
  };

  const handleFormSubmit = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      // Construct the request body object
      const requestBody = {
        rooms: [
          {
            roomNumber: formData.roomNumber,
            roomCategory: formData.roomCategory,
            pricePerRent: formData.pricePerRent,
            depositRequired: formData.depositRequired
            // Add more fields as needed
          }
        ]
      };
      console.log(requestBody);
      // Make the POST request to the backend
      const response = await axios.post(`http://localhost:8000/api/users/properties/${propertyId}/rooms`, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      reset(); // Clear the form fields
      onClose(); // Close the form
      toast.success('Room added to Property successfully!', {
        position: 'top-center',
        draggable: true,
      });
    } catch (error) {
      console.error('Error submitting room:', error);
      toast.error('An error occurred! Failed to Add room to a Property. Please try again.', {
        position: 'top-center',
        draggable: true,
    });
    }
  };
  useEffect(() => {
    // Fetch property details when propertyId changes
    const fetchPropertyDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/api/properties/${propertyId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        // Set property title and size
        setProperty(response.data.property);
      } catch (error) {
        console.error('Error fetching property details:', error);
      }
    };
  
    // Fetch rooms when propertyId changes
    const fetchRooms = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/api/properties/${propertyId}/rooms`, {
          headers: {
            Authorization: `Bearer ${token}`
        }
        });
        setRooms(response.data.rooms);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };
  
    // Only fetch property details and rooms if propertyId is defined
    if (propertyId) {
      fetchPropertyDetails();
      fetchRooms();
    }
  }, [propertyId]);
  

  return (
    <div className='add_room_container'>
       <div className='topNavigator'>
        <p>Add Rooms to {property.property_title}</p>
        <p>Property Size: 
          {property.units && property.units.length > 0 ? (
            property.units.map((unit, index) => (
                <span key={index}>{unit.size}</span>
            ))
            ) : (
              ''
          )}
        </p>
        <p>Total Rooms added: {rooms.length}</p>
      </div>
      <form onSubmit={handleSubmit(handleFormSubmit)} className='add_room_form'>
        <div>
          <div className='row'>
            <label htmlFor="roomNumber">Room Number:</label>
            <input type="number" placeholder='Enter room number' id="roomNumber" {...register('roomNumber', { required: true })} />
          </div>
          {errors.roomNumber && <span>Room number is required</span>}
        </div>
        <div>
          <div className='row'>
            <label htmlFor="roomCategory">Room Category:</label>
            <select className='roomCategory' id="roomCategory" {...register('roomCategory', { required: true })}>
              <option value="">Select Room Category</option>
              <option value="Single Room">Single Room</option>
              <option value="Double Room">Double Room</option>
              <option value="Bed Sitter">Bed Sitter</option>
              <option value="One Bedroom">One Bedroom</option>
              <option value="Two Bedrooms">Two Bedrooms</option>
              <option value="Three Bedrooms">Three Bedrooms</option>
              <option value="Self-Contained House">Self-Contained House</option>
              {/* Add more options as needed */}
          </select>

          </div>
          {errors.roomCategory && <span>Room category is required</span>}
        </div>
        <div>
          <div className='row'>
            <label htmlFor="pricePerRent">Price Per Rent:</label>
            <input type="number" placeholder='Enter price per rent' id="pricePerRent" {...register('pricePerRent', { required: true })} />
          </div>
          {errors.pricePerRent && <span>Price per rent is required</span>}
        </div>
        <div>
          <div className='row'>
            <label htmlFor="depositRequired">Deposit Required:</label>
            <input type="number" placeholder='Enter deposit required' id="depositRequired" {...register('depositRequired', { required: true })} />
          </div>
          {errors.depositRequired && <span>Deposit required is required</span>}
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleClose} className='closeBtn'>Cancel</button>
      </form>
    </div>
  );
};

export default RoomForm;
