import React, { useState, useEffect} from 'react';
import { TextField,MenuItem, Button, Grid, Typography, Box} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const TenantForm = () => {
    const [properties, setProperties] = useState([]);
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        idNumber: '',
        dateOfBirth: '',
        tenant_email: '',
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
    const [selectedProperty, setSelectedProperty] = useState(null); // State variable to hold selected property
    const [selectedUnit, setSelectedUnit] = useState(null);

    const handlePropertySelect = (event) => {
        const selectedPropertyId = event.target.value;
        const property = properties.find(property => property._id === selectedPropertyId);
        setSelectedProperty(property);
        // Reset selected unit when a new property is selected
        setSelectedUnit(null);
    };
    const handleUnitSelect = () => {
        // Assuming there's only one unit number associated with each property
        const selectedUnitNumber = selectedProperty.units[0].unit_number;
    
        // Fetch rooms associated with the selected unit
        fetchRooms(selectedProperty._id, selectedUnitNumber);
    };
    
    const fetchRooms = async (propertyId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/api/properties/${propertyId}/rooms`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Assuming response.data.rooms is an array of rooms associated with the selected unit
            const rooms = response.data.rooms;
            // Set the fetched rooms in state or perform any other necessary operation
            // setRooms(rooms);
        } catch (error) {
            console.error('Error fetching rooms:', error);
            // Handle error, such as showing an error message
        }
    };
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8000/api/properties',{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProperties(response.data.properties);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, []);
    // Calculate startDate based on the current date
    const startDate = new Date(); // Current date

    // Calculate endDate as 1 year ahead
    const endDate = new Date(startDate);
    endDate.setFullYear(endDate.getFullYear() + 1); // Set endDate to 1 year ahead

    // Format startDate and endDate as yyyy-MM-dd strings
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];
    // Get the current year
    const currentYear = new Date().getFullYear();

    // Generate an array of years from the current year to 100 years back
    const yearsArray = Array.from({ length: 101 }, (_, index) => currentYear - index);

    const [errorMessage, setErrorMessage] = useState('');
    const [activeGroup, setActiveGroup] = useState(0); // State to track active slider group
    const [isValid, setIsValid] = useState(true);
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'property') {
            handlePropertySelect(e); // Update selected property
        } else if (name === 'unit_number') {
            handleUnitSelect(e); // Update selected unit number
        }
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
                    tenant_city: formData.street,
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
                tenant_email: '',
                phoneNumber1: '',
                phoneNumber2: '',
                tenant_city: '',
                tenant_county: '',
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
            setSelectedProperty(null);
            setSelectedUnit(null);
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
    const relationshipList = [
        "Spouse", "Child", "Parent" 
        // Add more relationship options as needed
    ];
    
    // Define groups array for slider content
    const groups = [
        { 
            name: "Tenant Basic Information", 
            fields: [
                'firstName', 'middleName', 'lastName', 'idNumber', 'dateOfBirth','tenant_email', 'phoneNumber1', 'phoneNumber2','tenant_county', 'tenant_street', 'tenant_postalCode', 
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
                                        if (
                                            fieldName === 'property' ||
                                            fieldName === 'tenant_county' || 
                                            fieldName === 'county' || 
                                            fieldName === 'unit_number' || 
                                            fieldName === 'roomNumber' || 
                                            fieldName === 'roomCategory'|| 
                                            fieldName === 'relationship' ||
                                            fieldName === 'startDate' ||
                                            fieldName === 'endDate' ||
                                            fieldName === 'rentAmount' ||
                                            fieldName === 'depositAmount' 
                                        ) {
                                            return (
                                                <TextField
                                                    fullWidth
                                                    name={fieldName}
                                                    value={formData[fieldName]}
                                                    onChange={(event) => handleChange(event)}
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
                                                        properties.map((property, idx) => (
                                                            <MenuItem key={idx} value={property._id}>
                                                                {property.property_title}
                                                            </MenuItem>
                                                        ))
                                                    )}
                                                    {fieldName === 'unit_number' && selectedProperty && (
                                                        // Map over the units of the selected property to render MenuItem for each unit
                                                        selectedProperty.units.map((unit, idx) => (
                                                            <MenuItem key={idx} value={unit.unit_number}>
                                                                {unit.unit_number}
                                                            </MenuItem>
                                                        ))
                                                    )}
                                                    {fieldName === 'roomNumber' && selectedProperty && (
                                                        // Map over the room numbers associated with the selected property
                                                        selectedProperty.units.flatMap(unit => unit.rooms).map((room, idx) => (
                                                            <MenuItem key={idx} value={room.roomNumber}>
                                                                {room.roomNumber}
                                                            </MenuItem>
                                                        ))
                                                    )}
                                                    {fieldName === 'roomCategory' && selectedProperty && (
                                                        // Map over the room categories associated with the selected property
                                                        selectedProperty.units.flatMap(unit => unit.rooms).filter(room => room.roomNumber === formData.roomNumber).map((room, idx) => (
                                                            <MenuItem key={idx} value={room.roomCategory}>
                                                                {room.roomCategory}
                                                            </MenuItem>
                                                        ))
                                                    )}
                                                    {fieldName === 'startDate' && (
                                                        <MenuItem value={formattedStartDate}>{formattedStartDate}</MenuItem>
                                                    )}
                                                    {fieldName === 'endDate' && (
                                                        <MenuItem value={formattedEndDate}>{formattedEndDate}</MenuItem>
                                                    )}
                                                    {fieldName === 'rentAmount' && selectedProperty && (
                                                        // Map over the room categories associated with the selected property
                                                        selectedProperty.units
                                                            .flatMap(unit => unit.rooms)
                                                            .filter(room => room.roomNumber === formData.roomNumber)
                                                            .map((room, idx) => (
                                                                <MenuItem key={idx} value={room.pricePerRent}>
                                                                    {room.pricePerRent}
                                                                </MenuItem>
                                                            ))
                                                    )}
                                                    {fieldName === 'depositAmount' && selectedProperty && (
                                                        // Map over the room categories associated with the selected property
                                                        selectedProperty.units
                                                            .flatMap(unit => unit.rooms)
                                                            .filter(room => room.roomNumber === formData.roomNumber)
                                                            .map((room, idx) => (
                                                                <MenuItem key={idx} value={room.depositRequired}>
                                                                    {room.depositRequired}
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
                                                    {fieldName === 'tenant_county' && (
                                                        kenyaCounties.map((tenant_county, idx) => (
                                                            <MenuItem key={idx} value={tenant_county}>
                                                                {tenant_county}
                                                            </MenuItem>
                                                        ))
                                                    )}
                                                    
                                                    {fieldName === 'relationship' && (
                                                        relationshipList.map((relationship, idx) => (
                                                            <MenuItem key={idx} value={relationship}>
                                                                {relationship}
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
                                                        fieldName === 'dateOfBirth' ? "Enter Date of Birth dd/mm/y" : 
                                                        fieldName === 'tenant_email' ? "Enter Email Address" :
                                                        fieldName === 'phoneNumber1' ? "Enter Phone Number" : 
                                                        fieldName === 'phoneNumber2' ? "Enter alternative Phone Number" : 
                                                        fieldName === 'tenant_street' ? "Street" : 
                                                        fieldName === 'tenant_county' ? "County" : 
                                                        fieldName === 'tenant_postalCode' ? "Enter Postal Code" : 
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
