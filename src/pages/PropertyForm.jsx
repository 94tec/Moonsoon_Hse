import React, { useState } from 'react';
import { TextField,MenuItem, Button, Grid, Typography, Box} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const PropertyForm = () => {
    const [formData, setFormData] = useState({
        property_title: '',
        property_description: '',
        street: '',
        city: '',
        county: '',
        nearby_amenities: '',
        year_built: '',
        condition: '',
        unit_number: '',
        property_type: '', 
        size: '',
        estimated_price: '',
        currency: '',
        additional_costs: '',
        floor_plan: '',
        contact_person: '',
        phone_number: '',
        email_address: '',
        security_features: '',
        safety_features: '',
        owner_fullname: '',
        owner_idNumber: '',
        owner_email: '',
        legal_documentation: ''        
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
                property_title: formData.property_title,
                property_description: formData.property_description,
                nearby_amenities: formData.nearby_amenities,
                location: {
                    county: formData.county,
                    city: formData.city,
                    street: formData.street
                },
                year_built: formData.year_built,
                condition: formData.condition,
                units: [  // Add the units field here
                {
                    unit_number: formData.unit_number,
                    property_type: formData.property_type,
                    size: formData.size,
                    financial_information: {
                        estimated_price: formData.estimated_price,
                        currency: formData.currency,
                        additional_costs: formData.additional_costs
                    }
                }
            ],
                contact_information: {
                    contact_person: formData.contact_person,
                    contact_details: {
                        phone_number: formData.phone_number,
                        email_address: formData.email_address
                    }
                },
                security_and_safety: {
                    security_features: formData.security_features,
                    safety_features: formData.safety_features
                },
                legal_information: {
                    ownership_details: {
                        owner_fullname: formData.owner_fullname,
                        owner_idNumber: formData.owner_idNumber,
                        owner_email: formData.owner_email
                    },
                    legal_documentation: formData.legal_documentation
                }
                // Add more fields as needed
            };
    
            // Frontend validation
            if (!formData.property_title || !formData.property_description || !formData.street || !formData.city || !formData.county) {
                console.error('Error: Please fill in all required fields.');
                return;
            }
    
            const token = localStorage.getItem('token');
            console.log('FormData:', formData);
            const response = await axios.post('http://localhost:8000/api/users/properties', requestBody, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:', response.data);
            toast.success('Property Created successfully!', {
                position: 'top-center',
                draggable: true,
              });
            // Reset form after successful submission if needed
            setFormData({
                property_title: '',
                property_description: '',
                street: '',
                city: '',
                county: '',
                nearby_amenities: '',
                year_built: '',
                condition: '',
                unit_number: '',
                property_type: '',
                size: '',
                estimated_price: '',
                currency: '',
                additional_costs: '',
                floor_plan: '',
                contact_person: '',
                phone_number: '',
                email_address: '',
                security_features: '',
                safety_features: '',
                owner_fullname: '',
                owner_idNumber: '',
                owner_email: '',
                legal_documentation: ''
            });
        } catch (error) {
            console.error('Error submitting property:', error);
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
            toast.error('An error occurred! Failed to Create Property. Please try again.', {
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

    const currencies = ["USD", "EUR", "KES"]; // Define currencies
    // Define groups array for slider content
    const groups = [
        { 
            name: "Property Basic Info", 
            fields: ['property_title', 'property_description', 'county', 'city', 'street', 'nearby_amenities', 'year_built', 'condition'] 
        },
        { 
            name: "Rooms and Price Information", 
            fields: ['unit_number', 'property_type', 'size', 'estimated_price', 'currency', 'additional_costs', 'floor_plan'] 
        },
        { 
            name: "Security Features and Ownership Details", 
            fields: ['contact_person', 'phone_number', 'email_address', 'security_features', 'safety_features', 'owner_fullname', 'owner_idNumber', 'owner_email', 'legal_documentation'] 
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
                    Property Form
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
                                        if (fieldName === 'year_built' || fieldName === 'county' || fieldName === 'currency') {
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
                                                    {fieldName === 'year_built' && (
                                                        Array.from({ length: 50 }, (_, index) => (
                                                            <MenuItem key={index} value={new Date().getFullYear() - index}>
                                                                {new Date().getFullYear() - index}
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
                                                    {fieldName === 'currency' && (
                                                        currencies.map((currency, idx) => (
                                                            <MenuItem key={idx} value={currency}>
                                                                {currency}
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
                                                        fieldName === 'property_title' ? "Enter Property Title" :
                                                        fieldName === 'property_description' ? "Enter Property Description" : 
                                                        fieldName === 'street' ? "Enter Street" : 
                                                        fieldName === 'city' ? "Enter City" : 
                                                        fieldName === 'nearby_amenities' ? "Enter Nearby Amenities" : 
                                                        fieldName === 'parking' ? "Parking Available" : 
                                                        fieldName === 'accessibility_features' ? "Accessibility Features" : 
                                                        fieldName === 'condition' ? "Enter Condition" : 
                                                        fieldName === 'floor_plan' ? "Floor Plan" : 
                                                        fieldName === 'unit_number' ? "Enter Unit Number" : 
                                                        fieldName === 'size' ? "Enter Size" : 
                                                        fieldName === 'estimated_price' ? "Enter Estimated Price" : 
                                                        fieldName === 'contact_person' ? "Enter Contact Person" : 
                                                        fieldName === 'phone_number' ? "Enter Phone Number" : 
                                                        fieldName === 'email_address' ? "Enter Email Address" : 
                                                        fieldName === 'security_features' ? "Enter Security Features" : 
                                                        fieldName === 'safety_features' ? "Enter Safety Features" : 
                                                        fieldName === 'owner_fullname' ? "Enter Owner Fullname" : 
                                                        fieldName === 'owner_idNumber' ? "Enter Owner ID Number" : 
                                                        fieldName === 'owner_email' ? "Enter Owner Email" : 
                                                        fieldName === 'legal_documentation' ? "Enter Legal Documentation" : 
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

export default PropertyForm;
