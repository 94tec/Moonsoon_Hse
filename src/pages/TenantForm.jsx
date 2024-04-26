import React, { useState } from 'react';
import { TextField,MenuItem, Button, Grid, Typography, Box} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const TenantForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        idNumber: '',
        dateOfBirth: '',
        tennant_email: '',
        phoneNumber1: '',
        phoneNumber2: '',
        tenant_county: '',
        tenant_city: '',
        tenant_postalCode: '',
        email: '',
        name: '',
        relationship: '', 
        phoneNumber: '',
        city: '',
        county: '',
        postalCode: '',
        property: '',
        unit_number: '',
        roomNumber: '',
        roomCategory: '',
        startDate: '',
        endDate: '',
        rentAmount: '',
        depositAmount: ''       
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [activeGroup, setActiveGroup] = useState(0); // State to track active slider group
    const [isValid, setIsValid] = useState(true);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleGroupChange = (index) => {
        setActiveGroup(index);
    };
    const handleSubmit = async () => {
        try {
            // Construct the request body object
            const requestBody = {
                firstName: formData.firstName,
                middleName: formData.middleName,
                lastName: formData.lastName,
                idNumber: formData.idNumber,
                dateOfBirth: formData.dateOfBirth,
                tenant_email: formData.tenant_email,
                phoneNumber1: formData.phoneNumber1,
                phoneNumber2: formData.phoneNumber2,
                tenant_address: {
                    tenant_county: formData.county,
                    tenant_street: formData.street,
                    tenant_postalCode: formData.city
                },
                emergencyContact: 
                {
                    name: formData.name,
                    email: formData.email,
                    relationship: formData.relationship,
                    phoneNumber: formData.phoneNumber,
                    address: {
                        county: formData.county,
                        street: formData.street,
                        postalCode: formData.postalCode
                    },
                },
                property: formData.property,
                unit_number: formData.unit_number,
                roomCategory: formData.roomCategory,
                lease: {
                    startDate: formData.startDate,
                    endDate: formData.endDate,
                    rentAmount: formData.rentAmount,
                    depositAmount: formData.depositAmount,
                },
                // Add more fields as needed
            };
    
            const token = localStorage.getItem('token');
            console.log('FormData:', formData);
            const response = await axios.post('http://localhost:8000/api/users/tenants', requestBody, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:', response.data);
            toast.success('Tenant Created successfully!', {
                position: 'top-center',
                draggable: true,
              });
            // Reset form after successful submission if needed
            setFormData({
                firstName: '',
                middleName: '',
                lastName: '',
                idNumber: '',
                dateOfBirth: '',
                tennant_email: '',
                phoneNumber1: '',
                phoneNumber2: '',
                tennant_city: '',
                tennant_county: '',
                tennant_postalCode: '',
                email: '',
                name: '',
                relationship: '', 
                phoneNumber: '',
                city: '',
                county: '',
                postalCode: '',
                property: '',
                unit_number: '',
                roomNumber: '',
                roomCategory: '',
                startDate: '',
                endDate: '',
                rentAmount: '',
                depositAmount: ''    
            });
        } catch (error) {
            console.error('Error submitting tenant:', error);
            if (error.response) {
                // If the error has a response object
                setErrorMessage(error.response.data.message || 'An error occurred');
              } else if (error.request) {
                // If the request was made but no response was received
                setErrorMessage('No response received from server');
              } else {
                // If an error occurred during the request setup
                setErrorMessage('Error setting up the request');
              }
            toast.error('An error occurred! Failed to Create Tenant. Please try again.', {
                position: 'top-center',
                draggable: true,
            });
        }
    };
    const kenyaCounties = [
        "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo Marakwet", "Embu", "Garissa", "Homa Bay", "Isiolo", "Kajiado",
        "Kakamega", "Kericho", "Kiambu", "Kilifi", "Kirinyaga", "Kisii", "Kisumu", "Kitui", "Kwale", "Laikipia", "Lamu",
        "Machakos", "Makueni", "Mandera", "Marsabit", "Meru", "Migori", "Mombasa", "Murang'a", "Nairobi", "Nakuru", "Nandi",
        "Narok", "Nyamira", "Nyandarua", "Nyeri", "Samburu", "Siaya", "Taita Taveta", "Tana River", "Tharaka Nithi",
        "Trans Nzoia", "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot"
    ];

    // Define groups array for slider content
    const groups = [
        { 
            name: "Tenant Basic Information", 
            fields: [
                'firstName', 'middleName', 'lastName', 'idNumber', 'dateOfBirth','tennant_email', 'phoneNumber1', 'phoneNumber2','tenant_county', 'tenant_street', 'tenant_postalCode', 
            ] 
        },
        { 
            name: "Emergency Contact Details", 
            fields: ['name', 'email', 'relationship', 'phoneNumber','county','street', 'postalCode',] 
        },
        { 
            name: "Property and Unit/Rooms Details", 
            fields: ['property', 'unit_number', 'roomNumber', 'roomCategory', 'startDate', 'endDate', 'rentAmount', 'depositAmount'] 
        }
    ];
    const handleNext = () => {
        // Check if all fields in the current group are filled out
        const currentGroup = groups[activeGroup];
        const isValidGroup = currentGroup.fields.every(field => formData[field]);
        setIsValid(isValidGroup);
        
        // If valid, proceed to the next group
        if (isValidGroup && activeGroup < groups.length - 1) {
            setActiveGroup(activeGroup + 1);
        }
    };
    return (
        <Grid container >
            <Grid item xs={12}>
                <Typography variant="h4" gutterBottom>
                    Tenant Form
                </Typography>
            </Grid>
            <Grid item xs={12}>
                {/* Slider buttons */}
                {groups.map((group, index) => (
                    <Button 
                        key={index} 
                        onClick={() => setActiveGroup(index)} 
                        variant={activeGroup === index ? 'contained' : 'outlined'}
                        style={{ marginRight: index !== groups.length - 1 ? '10px' : 0 }} // Add margin to all buttons except the last one
                    >
                        {group.name}
                    </Button>
                ))}
            </Grid>
            <Grid item xs={12}>
                {/* Slider content */}
                {groups.map((group, index) => (
                    <div key={index} style={{ display: index === activeGroup ? 'block' : 'none' }}>
                        <Typography variant="h6" gutterBottom>{group.name}</Typography>
                        <div className="field-grid">
                            {group.fields.map((fieldName, idx) => (
                                <Box key={idx} className="field-box">
                                    <Typography className="field-label">{fieldName}</Typography>
                                    {/* Render TextField or Select based on field name */}
                                    {(() => {
                                        if (fieldName === 'property' || fieldName === 'county' || fieldName === 'unit_number' || fieldName === 'roomNumber' || fieldName === 'roomCategory') {
                                            return (
                                                <TextField
                                                    fullWidth
                                                    name={fieldName}
                                                    value={formData[fieldName]}
                                                    onChange={handleChange}
                                                    select
                                                    InputLabelProps={{ shrink: true }}
                                                    SelectProps={{
                                                        displayEmpty: true,
                                                        MenuProps: {
                                                            PaperProps: {
                                                                style: {
                                                                    maxHeight: 200, // Set max height of the menu
                                                                },
                                                            },
                                                        },
                                                    }}
                                                    placeholder={`Select ${fieldName.replace('_', ' ')}`}
                                                    className="field-input"
                                                >
                                                    <MenuItem value="" disabled>
                                                        {`Select ${fieldName.replace('_', ' ')}`}
                                                    </MenuItem>
                                                    {/* Render options for select fields */}
                                                    {fieldName === 'property' && (
                                                         kenyaCounties.map((property, idx) => (
                                                            <MenuItem key={idx} value={property}>
                                                                {property}
                                                            </MenuItem>
                                                        ))
                                                    )}
                                                    {fieldName === 'county' && (
                                                        kenyaCounties.map((county, idx) => (
                                                            <MenuItem key={idx} value={county}>
                                                                {county}
                                                            </MenuItem>
                                                        ))
                                                    )}
                                                    {fieldName === 'unit_number' && (
                                                        kenyaCounties.map((unit_number, idx) => (
                                                            <MenuItem key={idx} value={unit_number}>
                                                                {unit_number}
                                                            </MenuItem>
                                                        ))
                                                    )}
                                                    {fieldName === 'roomNumber' && (
                                                        kenyaCounties.map((roomNumber, idx) => (
                                                            <MenuItem key={idx} value={roomNumber}>
                                                                {roomNumber}
                                                            </MenuItem>
                                                        ))
                                                    )}
                                                    {fieldName === 'roomCategory' && (
                                                        kenyaCounties.map((roomCategory, idx) => (
                                                            <MenuItem key={idx} value={roomCategory}>
                                                                {roomCategory}
                                                            </MenuItem>
                                                        ))
                                                    )}
                                                </TextField>
                                            );
                                        } else {
                                            // Render regular TextField
                                            return (
                                                <TextField
                                                    fullWidth
                                                    name={fieldName}
                                                    value={formData[fieldName]}
                                                    onChange={handleChange}
                                                    placeholder={
                                                        fieldName === 'firstName' ? "Enter Tenant's First Name" :
                                                        fieldName === 'middleName' ? "Enter Tenant's Middle Name" : 
                                                        fieldName === 'lastName' ? "Enter Tenant's Last Name" : 
                                                        fieldName === 'idNumber' ? "Enter ID Number" : 
                                                        fieldName === 'dateOfBirth' ? "Enter Date of Birth" : 
                                                        fieldName === 'tennant_email' ? "Enter Email Address" :
                                                        fieldName === 'phoneNumber1' ? "Enter Phone Number" : 
                                                        fieldName === 'phoneNumber2' ? "Enter alternative Phone Number" : 
                                                        fieldName === 'tennant_street' ? "Street" : 
                                                        fieldName === 'tennant_county' ? "County" : 
                                                        fieldName === 'tennant_postalCode' ? "Enter Postal Code" : 
                                                        fieldName === 'name' ? "Enter Emergency Contact Name" : 
                                                        fieldName === 'email' ? "Enter Emergency Contact Email Address" : 
                                                        fieldName === 'phoneNumber' ? "Enter Phone Number" : 
                                                        fieldName === 'street' ? "Street" : 
                                                        fieldName === 'County' ? "County" : 
                                                        fieldName === 'postalCode' ? "Posta Code" : 
                                                        ""
                                                    }
                                                    className="field-input"
                                                />
                                            );
                                        }
                                    })()}  
                                </Box>
                            ))}
                        </div>
                    </div>
                ))}
            </Grid>
            <Grid item xs={12}>
                {/* Next button */}
                {(activeGroup === 0 || activeGroup === 1) && (
                    <Button variant="contained" color="primary" onClick={handleNext}>
                        Next
                    </Button>
                )}
                {/* Submit button */}
                {activeGroup === groups.length - 1 && (
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                )}
            </Grid>
            {errorMessage && <p>Error: {errorMessage}</p>}
        </Grid>
    );
};

export default TenantForm;
