// src/components/AddressBook.js
// src/components/AddressBook.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddressBook = ({ addresses, defaultAddress, onSelectDefault, onAddOrUpdateAddress, showAddAddressForm, setShowAddAddressForm }) => {
  const [counties, setCounties] = useState([]);
  const [subcounties, setSubcounties] = useState([]);
  const [wards, setWards] = useState([]);
  const [newAddress, setNewAddress] = useState({
    county: '',
    subcounty: '',
    ward: '',
    local: ''
  });
  const [isDefault, setIsDefault] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/locations');
        setCounties(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  const handleCountyChange = (e) => {
    const selectedCounty = e.target.value;
    const county = counties.find(c => c.name === selectedCounty);
    setSubcounties(county ? county.subcounties : []);
    setNewAddress({ ...newAddress, county: selectedCounty, subcounty: '', ward: '' });
  };

  const handleSubcountyChange = (e) => {
    const selectedSubcounty = e.target.value;
    const subcounty = subcounties.find(s => s.name === selectedSubcounty);
    setWards(subcounty ? subcounty.wards : []);
    setNewAddress({ ...newAddress, subcounty: selectedSubcounty, ward: '' });
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    onAddOrUpdateAddress(newAddress, isDefault);
    setNewAddress({
      county: '',
      subcounty: '',
      ward: '',
      local: ''
    });
    setIsDefault(false);
    setShowAddAddressForm(false);
  };

  return (
    <div>
      <h2>Address Book</h2>
      <div>
        <h3>Existing Addresses</h3>
        {addresses.map((address) => (
          <div key={address._id}>
            <p>{address.address}</p>
            <button onClick={() => onSelectDefault(address._id)}>Set as Default</button>
          </div>
        ))}
      </div>
      <button onClick={() => setShowAddAddressForm(true)} className="add-address-button">
        Add New Address
      </button>
      {showAddAddressForm && (
        <div>
          <form className="add-address-form" onSubmit={handleAddAddress}>
            <label>
              County:
              <select
                name="county"
                value={newAddress.county}
                onChange={handleCountyChange}
                required
              >
                <option value="">Select County</option>
                {counties.map(county => (
                  <option key={county.name} value={county.name}>{county.name}</option>
                ))}
              </select>
            </label>
            <label>
              SubCounty:
              <select
                name="subcounty"
                value={newAddress.subcounty}
                onChange={handleSubcountyChange}
                required
              >
                <option value="">Select Subcounty</option>
                {subcounties.map(subcounty => (
                  <option key={subcounty.name} value={subcounty.name}>{subcounty.name}</option>
                ))}
              </select>
            </label>
            <label>
              Ward:
              <select
                name="ward"
                value={newAddress.ward}
                onChange={(e) => setNewAddress({ ...newAddress, ward: e.target.value })}
                required
              >
                <option value="">Select Ward</option>
                {wards.map(ward => (
                  <option key={ward.name} value={ward.name}>{ward.name}</option>
                ))}
              </select>
            </label>
            <label>
              Local:
              <input
                type="text"
                name="local"
                value={newAddress.local}
                onChange={(e) => setNewAddress({ ...newAddress, local: e.target.value })}
                required
              />
            </label>
            <label>
              <input
                type="checkbox"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
              /> Set as Default
            </label>
            <button type="submit">Save Address</button>
          </form>
          <button onClick={() => setShowAddAddressForm(false)} className="hide-address-form-button">
            Hide
          </button>
        </div>
      )}
    </div>
  );
};

export default AddressBook;
