import React, { useState, useEffect, useContext } from 'react';
import { FaUser, FaBox, FaStore, FaInbox } from 'react-icons/fa';
import axios from 'axios';
import AccountDetails from './AccountDetails';
import AddressBook from './AddressBook';
import { UserContext } from '../contexts/UserContext';
import '../styles.css';

const UserAccount = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const { user, setUser } = useContext(UserContext);
  const [addresses, setAddresses] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState('');
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (userId) {
          const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
          setUser(response.data);
          setAddresses(response.data.addresses);
          const defaultAddr = response.data.addresses.find(addr => addr.isDefault);
          setDefaultAddress(defaultAddr ? defaultAddr.address : '');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [setUser]);

  const handleSelectDefault = async (addressId) => {
    try {
      const userId = localStorage.getItem('userId');
      await axios.patch(`http://localhost:5000/api/users/${userId}/address/default`, { addressId });
      setAddresses(prevAddresses => prevAddresses.map(addr => ({
        ...addr,
        isDefault: addr._id === addressId
      })));
      setDefaultAddress(addresses.find(addr => addr._id === addressId).address);
    } catch (error) {
      console.error('Error updating default address:', error);
    }
  };

  const handleAddOrUpdateAddress = async (address, isDefault) => {
    try {
      const userId = localStorage.getItem('userId');
      await axios.patch(`http://localhost:5000/api/users/${userId}/address`, { address, isDefault });
      const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
      setAddresses(response.data.addresses);
      const defaultAddr = response.data.addresses.find(addr => addr.isDefault);
      setDefaultAddress(defaultAddr ? defaultAddr.address : '');
    } catch (error) {
      console.error('Error adding or updating address:', error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Profile':
        return (
          <div className="profile-address-container">
            <div className="account-details-card">
              <AccountDetails user={user} />
              <div className="default-address">
                {defaultAddress ? (
                  <p><strong>Default Address:</strong> {defaultAddress}</p>
                ) : (
                  <p className="no-default-address">You haven't set your default address</p>
                )}
              </div>
            </div>
            <div className="address-book">
              <AddressBook
                addresses={addresses}
                defaultAddress={defaultAddress}
                onSelectDefault={handleSelectDefault}
                onAddOrUpdateAddress={handleAddOrUpdateAddress}
                showAddAddressForm={showAddAddressForm}
                setShowAddAddressForm={setShowAddAddressForm}
              />
            </div>
          </div>
        );
      case 'Orders':
        return <div>This is empty for now</div>;
      case 'My Shop':
        return <div>This is empty for now</div>;
      case 'Inbox':
        return <div>This is empty for now</div>;
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="user-account">
      <div className="tabs">
        <button onClick={() => setActiveTab('Profile')} className={activeTab === 'Profile' ? 'active' : ''}>
          <FaUser /> Profile
        </button>
        <button onClick={() => setActiveTab('Orders')} className={activeTab === 'Orders' ? 'active' : ''}>
          <FaBox /> Orders
        </button>
        <button onClick={() => setActiveTab('My Shop')} className={activeTab === 'My Shop' ? 'active' : ''}>
          <FaStore /> My Shop
        </button>
        <button onClick={() => setActiveTab('Inbox')} className={activeTab === 'Inbox' ? 'active' : ''}>
          <FaInbox /> Inbox
        </button>
      </div>
      <div className="tab-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default UserAccount;
