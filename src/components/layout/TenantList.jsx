import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableCell, TableRow, Typography, Button } from '@mui/material';

const TenantList = () => {
    const [tenants, setTenants] = useState([]);
    const [tenantId, setTenantId] = useState(null);
    useEffect(() => {
        const fetchTenants = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8000/api/tenants', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }); 
                setTenants(response.data.tenants); // Assuming the response contains a 'tenants' array
                console.log(response);
            } catch (error) {
                console.error('Error fetching tenants:', error);
            }
        };

        fetchTenants();
    }, []);
    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Tenant List
            </Typography>
            <Table className='tenants_table'>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Id Number</TableCell>
                        <TableCell>Phone Number</TableCell>
                        <TableCell>Email Address</TableCell>
                        <TableCell>Property Name</TableCell>
                        <TableCell>Room Number</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                        {/* Add more table headers as needed */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tenants.map((tenant) => (
                        <TableRow key={tenant._id}>
                            <TableCell>{tenant.firstName} {tenant.middleName} {tenant.lastName}</TableCell>
                            <TableCell>{tenant.idNumber}</TableCell>
                            <TableCell>{tenant.phoneNumber1}</TableCell>
                            <TableCell>{tenant.tenant_email}</TableCell>
                            <TableCell>{tenant.property}</TableCell>
                            <TableCell>{tenant.roomNumber}</TableCell>
                            <TableCell></TableCell>
                            {/* Add more table cells for additional data */}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default TenantList;
