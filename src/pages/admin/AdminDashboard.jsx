import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './css/AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboardTopWidget">
        <div className="search-container">
          <input type="text" placeholder="Search..." />
          <button type="submit">
              <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div className="links">
            <p>Total properties 56</p>
            <p>Active tenants 234</p>
            <Link to="/add-property">Add Property</Link>
            <Link to="/add-tenant">Add Tenant</Link>
        </div>
      </div>
      <div className="dashboardSideWidget">Side Navigation</div>
      <div className="dashboardMain">
        <p>Main Content Area</p>
        {/* You can further divide this area or populate it with other components */}
      </div>
    </div>
  );
}

export default AdminDashboard