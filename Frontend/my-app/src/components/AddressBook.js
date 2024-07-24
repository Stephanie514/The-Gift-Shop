// src/components/AddressBook.js
import React, { useState } from 'react';

const AddressBook = ({ addresses, defaultAddress, onSelectDefault, onAddOrUpdateAddress, showAddAddressForm, setShowAddAddressForm }) => {
  const [newAddress, setNewAddress] = useState({
    county: '',
    subcounty: '',
    ward: '',
    local: ''
  });
  const [isDefault, setIsDefault] = useState(false);

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
                onChange={(e) => setNewAddress({ ...newAddress, county: e.target.value })}
                required
              >
                {/* Populate with Kenyan Counties */}
              </select>
            </label>
            <label>
              SubCounty:
              <select
                name="subcounty"
                value={newAddress.subcounty}
                onChange={(e) => setNewAddress({ ...newAddress, subcounty: e.target.value })}
                required
              >
                {/* Populate with Subcounties based on selected County */}
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
                {/* Populate with Wards based on selected Subcounty */}
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
