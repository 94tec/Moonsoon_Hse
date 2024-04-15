import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../assets/Tenants.css';
import AllTenants from './AllTenants';
import TenantForm from './TenantForm';

const Tenants = () => {
  const [activeTab, setActiveTab] = useState('AllTenants');

  return (
    <div className="tenant-container">
      <div className=" tenant-container-topnav tenant-container-tabs">
        <div className="search-bar">
          <input type="text" placeholder="Search for Tenant..." />
          <FontAwesomeIcon icon={faSearch}  className='fa-search'/>
        </div>
        <button onClick={() => setActiveTab('AllTenants')}>All Tenants</button>
        <button onClick={() => setActiveTab('addTenant')}>Add Tenant</button>
      </div>
      <div className="tenant-container-main">
        {activeTab === 'AllTenants' && <AllTenants />}
        {activeTab === 'addTenant' && <TenantForm />}
      </div>
    </div>
  );
};

export default Tenants;