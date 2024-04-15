import React from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const TenantForm = () => {
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        middleName: Yup.string().required('Middle Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        idNumber: Yup.string().required('ID Number is required'),
        dateOfBirth: Yup.date().required('Date of Birth is required'),
        phoneNumber1: Yup.string().required('Phone Number 1 is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        address: Yup.object().shape({
            street: Yup.string().required('Street is required'),
            city: Yup.string().required('City is required'),
            state: Yup.string().required('State is required'),
            postalCode: Yup.string().required('Postal Code is required'),
            country: Yup.string().required('Country is required')
        }),
        property: Yup.string().required('Property is required'),
        unitNumber: Yup.string().required('Unit Number is required'),
        roomCategory: Yup.string().required('Room Category is required'),
        lease: Yup.object().shape({
            startDate: Yup.date().required('Start Date is required'),
            endDate: Yup.date().required('End Date is required'),
            rentAmount: Yup.number().required('Rent Amount is required'),
            depositAmount: Yup.number().required('Deposit Amount is required')
        }),
        emergencyContact: Yup.object().shape({
            name: Yup.string().required('Emergency Contact Name is required'),
            relationship: Yup.string().required('Relationship is required'),
            phoneNumber: Yup.string().required('Emergency Contact Phone Number is required')
        })
    });

    const handleSubmit = (values, actions) => {
        console.log(values);
        actions.setSubmitting(false);
    };

    const initialValues = {
        firstName: '',
        middleName: '',
        lastName: '',
        idNumber: '',
        dateOfBirth: '',
        email: '',
        phoneNumber1: '',
        address: {
            street: '',
            city: '',
            state: '',
            postalCode: '',
            country: ''
        },
        property: '',
        unitNumber: '',
        roomCategory: '',
        lease: {
            startDate: '',
            endDate: '',
            rentAmount: '',
            depositAmount: ''
        },
        emergencyContact: {
            name: '',
            relationship: '',
            phoneNumber: ''
        }
    };
    const renderFields = () => {
        const basicInfoFields = {
            firstName: Yup.string().required('First name is required'),
            middleName: Yup.string().required('Middle name is required'),
            lastName: Yup.string().required('Last name is required'),
            idNumber: Yup.string().required('ID number is required'),
            dateOfBirth: Yup.date().required('Date of birth is required'),
            email: Yup.string().email('Invalid email format').required('Email is required'),
            phoneNumber1: Yup.string().required('Phone number is required'),
            phoneNumber2: Yup.string(),
        };

        const addressFields = {
            street: Yup.string().required('Street is required'),
            city: Yup.string().required('City is required'),
            state: Yup.string().required('State is required'),
            postalCode: Yup.string().required('Postal code is required'),
            country: Yup.string().required('Country is required'),
        };

        const propertyAndLeaseFields = {
            property: Yup.string().required('Property is required'),
            unitNumber: Yup.string().required('Unit number is required'),
            roomCategory: Yup.string().required('Room category is required'),
            startDate: Yup.date().required('Start date is required'),
            endDate: Yup.date().required('End date is required'),
            rentAmount: Yup.number().required('Rent amount is required'),
            depositAmount: Yup.number().required('Deposit amount is required'),
        };

        return (
            <>
                <Typography variant="h6" gutterBottom>
                    Basic Info
                </Typography>
                <div className="form-fields">{renderSectionFields(basicInfoFields)}</div>

                <Typography variant="h6" gutterBottom>
                    Address
                </Typography>
                <div className="form-fields1">{renderSectionFields(addressFields)}</div>

                <Typography variant="h6" gutterBottom>
                    Property and Lease Info
                </Typography>
                <div className="form-fields2">{renderSectionFields(propertyAndLeaseFields)}</div>
            </>
        );
    };

    const renderSectionFields = (fields) => {
        return Object.entries(fields).map(([fieldName, fieldSchema]) => (
            <div key={fieldName} className="field">
                <Field
                    name={fieldName}
                    as={TextField}
                    fullWidth
                    margin="normal"
                    label={fieldName.charAt(0).toUpperCase() + fieldName.slice(1).replace(/_/g, ' ')}
                    type={getFieldType(fieldSchema)}
                    className="form-field"
                />
            </div>
        ));
    };

    const getFieldType = (fieldSchema) => {
        if (fieldSchema.type === Yup.string) {
            return 'text';
        } else if (fieldSchema.type === Yup.number) {
            return 'number';
        } else if (fieldSchema.type === Yup.date) {
            return 'date';
        }
        return 'text';
    };

    return (
        <Grid className="container" justifyContent="center">
            <Grid item xs={12} md={6}>
                <Typography className="tenant-form-h4" variant="h4" gutterBottom>
                    Tenant Form
                </Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="form">
                            {renderFields()}
                            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                                Submit
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Grid>
        </Grid>
    );
};

export default TenantForm;
