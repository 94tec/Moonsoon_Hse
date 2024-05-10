import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableCell, TableRow, Typography, Button } from '@mui/material';
import RoomForm from '../../pages/RoomForm';

const PropertyList = () => {
    const [properties, setProperties] = useState([]);
    const [showRoomForm, setShowRoomForm] = useState(false);
    const [propertyId, setPropertyId] = useState(null);
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8000/api/properties', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }); 
                setProperties(response.data.properties); // Assuming the response contains a 'properties' array
                console.log(response);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };
        fetchProperties();
    }, []);
    
     // Function to toggle the visibility of the room form
    const toggleRoomForm = (propertyId) => {
        setShowRoomForm(true);
        setPropertyId(propertyId); // Set the propertyId when toggling the form
    };
    const handleCloseRoomForm = () => {
        setShowRoomForm(false);
        setPropertyId(null); // Reset propertyId when closing the form
    };
    const checkRoomsAdded = (property) => {
        if (property.units && property.units.length > 0) {
            // Calculate total number of rooms added in the property
            const totalRoomsAdded = property.units.reduce((total, unit) => total + unit.rooms.length, 0);
            // Log the number of rooms added
            // console.log(`Property ${property._id}: Total rooms added = ${totalRoomsAdded}`);
            // Compare with the property size
            if (totalRoomsAdded === property.units[0].size) {
                return <span style={{ color: '#0aec61' }}>Full</span>;
            } else {
                const roomsNotAdded = property.units[0].size - totalRoomsAdded;
                return <span style={{ color: 'orange' }}>+{roomsNotAdded}</span>;
            }
        }
        return null;
    };
    
    return (
        <div className="tableContent">
            <Typography variant="h4" gutterBottom>
                Property List
            </Typography>
            <div className="tableWrapper"> {/* Add a wrapper for styling */}
                <Table className='properties_table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Unit Number</TableCell>
                            <TableCell>Property Title</TableCell>
                            <TableCell>Property Type</TableCell>
                            <TableCell>Year Built</TableCell>
                            <TableCell>Size</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Condition</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Contact Person</TableCell>
                            <TableCell>Contact</TableCell>
                            <TableCell>Email Address</TableCell>
                            <TableCell>Action</TableCell>
                            <TableCell>Edit</TableCell>
                            {/* Add more table headers as needed */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {properties.map((property) => (
                            <TableRow key={property._id}>
                                <TableCell>
                                    {property.units && property.units.length > 0 ? (
                                        property.units.map((unit, index) => (
                                            <span key={index}>{unit.unit_number}</span>
                                        ))
                                    ) : (
                                        ''
                                    )}
                                </TableCell>
                                <TableCell>{property.property_title}</TableCell>
                                <TableCell>
                                    {property.units && property.units.length > 0 ? (
                                        property.units.map((unit, index) => (
                                            <span key={index}>{unit.property_type}</span>
                                        ))
                                    ) : (
                                        ''
                                    )}
                                </TableCell>
                                <TableCell>{property.year_built}</TableCell>
                                <TableCell>
                                    {property.units && property.units.length > 0 ? (
                                        property.units.map((unit, index) => (
                                            <span key={index}>{unit.size}</span>
                                        ))
                                    ) : (
                                        ''
                                    )}
                                </TableCell>
                                <TableCell>{checkRoomsAdded(property)}</TableCell>
                                <TableCell>{property.condition}</TableCell>
                                <TableCell>{property.location.county}</TableCell>
                                <TableCell>{property.contact_information ? property.contact_information.contact_person : ''}</TableCell>
                                <TableCell>{property.contact_information.contact_details ? property.contact_information.contact_details.phone_number : ''}</TableCell>
                                <TableCell>{property.contact_information ? property.contact_information.contact_details.email_address : ''}</TableCell>
                                <TableCell>
                                    <Button 
                                        className='action' variant="contained" color="primary" 
                                        onClick={() => {
                                            toggleRoomForm(property._id); // Toggle the visibility of the room form
                                        }}
                                    >
                                        Add Room(s)
                                    </Button>
                                </TableCell>
                                <TableCell> 
                                    <Button variant="outlined" color="primary" onClick={() => handleEditProperty(property._id)}>
                                        Edit
                                    </Button>
                                </TableCell>
                                {/* Add more table cells for additional data */}
                            </TableRow>
                        ))}
                    </TableBody>
            </Table>
            </div>
            
            {/* Render room form if showRoomForm is true */}
            {showRoomForm && <RoomForm onClose={handleCloseRoomForm} propertyId={propertyId}/>}
        </div>
    );
};

export default PropertyList;
