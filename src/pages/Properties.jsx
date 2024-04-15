import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../assets/Property.css';
import AllProperties from './AllProperties';
import PropertyForm from './PropertyForm';

const Properties = () => {
  const [activeTab, setActiveTab] = useState('allProperties');

  return (
    <div className="property-container">
      <div className=" property-container-topnav property-container-tabs">
        <div className="search-bar">
          <input type="text" placeholder="Search Property..." />
          <FontAwesomeIcon icon={faSearch}  className='fa-search'/>
        </div>
        <button onClick={() => setActiveTab('allProperties')}>All Properties</button>
        <button onClick={() => setActiveTab('addProperty')}>Add Property</button>
      </div>
      <div className="property-container-main">
        {activeTab === 'allProperties' && <AllProperties />}
        {activeTab === 'addProperty' && <PropertyForm />}
      </div>
    </div>
  );
};

export default Properties;
