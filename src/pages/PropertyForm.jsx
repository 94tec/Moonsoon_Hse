import React, { useState } from 'react';
import { 
    TextField, Button, Grid, Typography, MenuItem, Popper, Paper, ClickAwayListener 
} from '@mui/material'; // Import Popper, Paper, and ClickAwayListener  } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'; // for form validation
import axios from 'axios';
import RoomForm from './RoomForm';

const PropertyForm = () => {
    const [selectedCounty, setSelectedCounty] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const kenyaCounties = [
        "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo Marakwet", "Embu", "Garissa", "Homa Bay", "Isiolo", "Kajiado",
        "Kakamega", "Kericho", "Kiambu", "Kilifi", "Kirinyaga", "Kisii", "Kisumu", "Kitui", "Kwale", "Laikipia", "Lamu",
        "Machakos", "Makueni", "Mandera", "Marsabit", "Meru", "Migori", "Mombasa", "Murang'a", "Nairobi", "Nakuru", "Nandi",
        "Narok", "Nyamira", "Nyandarua", "Nyeri", "Samburu", "Siaya", "Taita Taveta", "Tana River", "Tharaka Nithi",
        "Trans Nzoia", "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot"
    ];
    // Define currencies
    const currencies = ["USD", "EUR", "KES", ]; // Add more currencies as needed
    // Define group schemas
    const { propertyBasicInfoGroup, roomsAndPriceInformationGroup, securityAndOwnershipDetailsGroup } = {
        propertyBasicInfoGroup: {
            property_title: Yup.string().required('Property title is required'),
            property_description: Yup.string().required('Property description is required'),
            county: Yup.string().required('Postal code is required'),
            city: Yup.string().required('City is required'),
            street: Yup.string().required('Street is required'),
            nearby_amenities: Yup.string().required('Nearby amenities are required'),
            parking: Yup.string().notRequired(),
            accessibility_features: Yup.string().notRequired(),
            year_built: Yup.string().required('Year built is required'),
            condition: Yup.string().notRequired(),
            
        },
        roomsAndPriceInformationGroup: {
            unitNumber: Yup.string().required('Unit number is required'),
            size: Yup.string().required('Size is required'),
            estimated_price: Yup.string().required('Price is required'),
            currency: Yup.string().required('Currency is required'),//select field
            floor_plan: Yup.string().required('Floor plan is required'),
            
        },
        securityAndOwnershipDetailsGroup: {
            contact_person: Yup.string().required('Contact person is required'),
            phone: Yup.string().required('Phone is required'),
            email: Yup.string().email('Invalid email format').required('Email is required'),
            security_features: Yup.string().required('Security features are required'),
            safety_features: Yup.string().required('Safety features are required'),
            owner_fullname: Yup.string().required('Ownership details are required'),
            owner_idNumber: Yup.string().required('Ownership details are required'),
            owner_email: Yup.string().required('Ownership details are required'),
            legal_documentation: Yup.string().required('Legal documentation is required')
        }
    };

    const initialValues = {
        propertyBasicInfoGroup: {
            property_title: '',
            property_description: '',
            location: {
                street: '',
                city: '',
                county: '',
            },
            nearby_amenities: '',
            year_built: '',
            condition: ''
            
        },
        roomsAndPriceInformationGroup: {
            unitNumber: '',
            size: '',
            financial_information: {
                estimated_price: '',
                currency: '',
                additional_costs: ''
            },
            floor_plan: ''
        },
        securityAndOwnershipDetailsGroup: {
            contact_information: {
                contact_person: '',
                contact_details: {
                    phone: '',
                    email: ''
                }
            },
            security_and_safety: {
                security_features: '',
                safety_features: ''
            },
            legal_information: {
                owner_fullname: '',
                owner_idNumber: '',
                owner_email: '',
                legal_documentation: ''
            }
        }
    };
    
    // Define validation schema
    const validationSchema = Yup.object().shape({
        propertyBasicInfoGroup: Yup.object().shape(propertyBasicInfoGroup),
        roomsAndPriceInformationGroup: Yup.object().shape(roomsAndPriceInformationGroup),
        securityAndOwnershipDetailsGroup: Yup.object().shape(securityAndOwnershipDetailsGroup)
    });
    // Define state for current group index
    const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
    const [isRoomFormOpen, setIsRoomFormOpen] = useState(false); // State to manage the visibility of the room form

    // Define groups array for slider content
    const groups = [
        { name: "Property Basic Info", fields: propertyBasicInfoGroup },
        { name: "Rooms and Price Information", fields: roomsAndPriceInformationGroup },
        { name: "Security Features and Ownership Details", fields: securityAndOwnershipDetailsGroup }
    ];

    // Function to handle moving to the previous group
    const handlePrevious = () => {
        setCurrentGroupIndex((prevIndex) => Math.max(0, prevIndex - 1));
    };

    // Function to handle moving to the next group
    const handleNext = () => {
        setCurrentGroupIndex((prevIndex) => Math.min(groups.length - 1, prevIndex + 1));
    };
    // Function to toggle the visibility of the room form
    const toggleRoomForm = () => {
        setIsRoomFormOpen((prevState) => !prevState);
    };

    // Function to recursively render form fields
    const renderFields = (fields) => {
        return Object.entries(fields).map(([fieldName, fieldSchema]) => {
            // Check if field has validation schema defined
            const validationRule = validationSchema.fields[fieldName];
            // Check if field is required
            const isRequired = validationRule && validationRule._exclusive.required === true;
            // Render select input for "Year Built" field
            if (fieldName === 'year_built') {
               // Generate years options
                const currentYear = new Date().getFullYear();
                const yearsOptions = Array.from({ length: 50 }, (_, index) => currentYear - index);

                return (
                    <div key={fieldName} className="field">
                        <Field
                            name={fieldName}
                            as={TextField}
                            select
                            fullWidth
                            margin="normal"
                            label={isRequired ? `${fieldName}*` : fieldName}
                            value={selectedYear} // Provide the value prop to make it controlled
                            onChange={(event) => setSelectedYear(event.target.value)} // Handle onChange to update the selected value
                            InputLabelProps={{ shrink: true }}
                            // Customize menu properties
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
                            placeholder="Select Year Built"
                        >
                            <MenuItem value="" disabled>
                                Select Year Built
                            </MenuItem>
                            {yearsOptions.map((year) => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Field>
                    </div>
                );
            }
            // Render select input for "County" field
            if (fieldName === 'county') {
                return (
                    <div key={fieldName} className="field">
                        <Field
                            name={fieldName}
                            as={TextField}
                            select
                            fullWidth
                            margin="normal"
                            label={isRequired ? `${fieldName}*` : fieldName}
                            value={selectedCounty} // Provide the value prop to make it controlled
                            onChange={(event) => setSelectedCounty(event.target.value)} // Handle onChange to update the selected value
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
                            placeholder="Select County"
                            InputLabelProps={{ shrink: true }}
                        >
                            <MenuItem value="" disabled>
                                Select County
                            </MenuItem>
                            {kenyaCounties.map((county) => (
                                <MenuItem key={county} value={county}>
                                    {county}
                                </MenuItem>
                            ))}
                        </Field>
                    </div>
                );
            }
            // Render select input for "Currency" field
            if (fieldName === 'currency') {
                return (
                    <div key={fieldName} className="field">
                        <Field
                            name={fieldName}
                            as={TextField}
                            select
                            fullWidth
                            margin="normal"
                            label={isRequired ? `${fieldName}*` : fieldName}
                            value={selectedCurrency} // Provide the value prop to make it controlled
                            onChange={(event) => setSelectedCurrency(event.target.value)} // Handle onChange to update the selected value
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
                            placeholder="Select Currency"
                            InputLabelProps={{ shrink: true }}
                        >
                            <MenuItem value="" disabled>
                                Select Currency
                            </MenuItem>
                            {currencies.map((currency) => (
                                <MenuItem key={currency} value={currency}>
                                    {currency}
                                </MenuItem>
                            ))}
                        </Field>
                    </div>
                );
            }
            return (
                <div key={fieldName} className="field">
                    <Field
                        name={fieldName}
                        as={TextField}
                        fullWidth
                        margin="normal"
                        label={isRequired ? `${fieldName}*` : fieldName} // Append asterisk if field is required
                        placeholder={fieldName}
                        InputLabelProps={{ shrink: true }} // Ensure label shrinks when input is focused
                    />
                </div>
            );
        });
    };
    // Function to handle room form submission
    const handleRoomFormSubmit = (roomFormData) => {
        // Process the submitted room data here
        console.log('Submitted room data:', roomFormData);
        // Close the room form
        setIsRoomFormOpen(false);
    };
   // Your form submission function
    const handleSubmit = async (values, actions, propertyData) => {
        try {
            const response = await axios.post('http://localhost:8000/api/users/properties', propertyData);
            console.log('Property submitted successfully:', response.data);
            // Reset the form after successful submission if needed
            setPropertyData({
                // Reset property data fields here
            });
        } catch (error) {
            console.error('Error submitting property:', error);
        } finally {
            if (actions) {
                actions.setSubmitting(false); // Manually set submitting to false after form submission
            }
        }
    };

    return (
        <>
            {/* Conditionally render the property form container based on the isRoomFormOpen state */}
            {!isRoomFormOpen && (
                <Grid className='property_form_container' justifyContent="center">
                    <Grid item xs={12} md={6}>
                        <Typography className='property-form-h4' variant="h4" gutterBottom>
                            Property Form
                        </Typography>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(values, actions) => handleSubmit(values, actions, propertyData)} // Pass propertyData as a parameter
                        >
                            {({ isSubmitting }) => (
                                <Form className="form">
                                    {/* Render form fields */}
                                    {/* Your form fields rendering code here */}
                                    <div className="slider-content">
                                        <Typography variant="h6" gutterBottom>
                                            {groups[currentGroupIndex].name}
                                        </Typography>
                                        <div className="slider-content-fields">{renderFields(groups[currentGroupIndex].fields)}</div>
                                        <div className='addRoom'>
                                            {currentGroupIndex === 1 && (
                                                <Button
                                                    type="button"
                                                    variant="contained"
                                                    color="primary"
                                                    className="addRoomBtn"
                                                    onClick={toggleRoomForm} // Toggle the visibility of the room form
                                                >
                                                    Add Room
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                    <div className="slider-controls">
                                        <Button
                                            type="button"
                                            variant="contained"
                                            color="primary"
                                            disabled={currentGroupIndex === 0}
                                            onClick={handlePrevious}
                                        >
                                            Previous
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="contained"
                                            color="primary"
                                            disabled={currentGroupIndex === groups.length - 1}
                                            onClick={handleNext}
                                        >
                                            Next
                                        </Button>
                                    </div>
                                    {/* Render submit button in the last slider */}
                                    
                                    {currentGroupIndex === groups.length - 1 && (
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            disabled={isSubmitting}
                                            className="submit-btn"
                                            onClick={handleSubmit}
                                        >
                                            Submit
                                        </Button>
                                    )}
                                </Form>
                            )}
                        </Formik>
                    </Grid>
                </Grid>
            )}

            {/* Render the RoomForm component if isRoomFormOpen is true */}
            {isRoomFormOpen && (
                <RoomForm isOpen={isRoomFormOpen} onClose={toggleRoomForm} onSubmit={handleRoomFormSubmit} />
            )}
        </>
    );
};

export default PropertyForm;
