// src/components/UserAccount.js
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
  const [showShopForm, setShowShopForm] = useState(false);
  const [shopFormData, setShopFormData] = useState({
    name: '',
    address: '',
    description: ''
  });
  const [products, setProducts] = useState([]);
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`, {
          headers: { 'x-auth-token': token }
        });
        setUser(response.data);
        setAddresses(response.data.addresses || []);
        setShops(response.data.shops || []);
        const defaultAddr = response.data.addresses.find(addr => addr.isDefault);
        setDefaultAddress(defaultAddr ? defaultAddr.address : '');
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [setUser]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (activeTab === 'My Shop' && selectedShop) {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:5000/api/products/shop/${selectedShop}`, {
            headers: { 'x-auth-token': token }
          });
          setProducts(response.data || []);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      }
    };

    fetchProducts();
  }, [activeTab, selectedShop]);

  const handleSelectDefault = async (addressId) => {
    try {
      const userId = localStorage.getItem('userId');
      await axios.patch(`http://localhost:5000/api/users/${userId}/address/default`, { addressId });
      setAddresses(prevAddresses => prevAddresses.map(addr => ({
        ...addr,
        isDefault: addr._id === addressId
      })));
      const newDefaultAddr = addresses.find(addr => addr._id === addressId);
      setDefaultAddress(newDefaultAddr ? newDefaultAddr.address : '');
    } catch (error) {
      console.error('Error updating default address:', error);
    }
  };

  const handleAddOrUpdateAddress = async (address, isDefault) => {
    try {
      const userId = localStorage.getItem('userId');
      await axios.patch(`http://localhost:5000/api/users/${userId}/address`, { address, isDefault });
      const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
      setAddresses(response.data.addresses || []);
      const defaultAddr = response.data.addresses.find(addr => addr.isDefault);
      setDefaultAddress(defaultAddr ? defaultAddr.address : '');
    } catch (error) {
      console.error('Error adding or updating address:', error);
    }
  };

  const handleShopFormChange = (e) => {
    const { name, value } = e.target;
    setShopFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmitShopForm = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
  
      console.log('Submitting shop form data:', {
        ...shopFormData,
        owner: userId
      });
  
      const response = await axios.post('http://localhost:5000/api/shops', {
        ...shopFormData,
        owner: userId
      }, {
        headers: {
          'x-auth-token': token
        }
      });
  
      console.log('Shop created successfully:', response.data);
      setShowShopForm(false);
      setShopFormData({ name: '', address: '', description: '' });
      alert('Shop created successfully');
      // Update the list of shops
      setShops(prevShops => [...prevShops, response.data]);
    } catch (error) {
      console.error('Error creating shop:', error.response ? error.response.data : error.message);
    }
  };

  const renderMyShopContent = () => {
    return (
      <div className="my-shop-content">
        <button onClick={() => setShowShopForm(true)} className="open-shop-button">
          Interested in selling your wares? Open your very own shop
        </button>
        {showShopForm && (
          <form onSubmit={handleSubmitShopForm} className="shop-form">
            <div>
              <label htmlFor="name">Shop Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={shopFormData.name}
                onChange={handleShopFormChange}
                required
              />
            </div>
            <div>
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={shopFormData.address}
                onChange={handleShopFormChange}
                required
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={shopFormData.description}
                onChange={handleShopFormChange}
              />
            </div>
            <button type="submit">Create Shop</button>
            <button type="button" onClick={() => setShowShopForm(false)}>Cancel</button>
          </form>
        )}
        <div className="shop-selector">
          <label htmlFor="shopSelect">Select Shop:</label>
          <select
            id="shopSelect"
            value={selectedShop || ''}
            onChange={(e) => setSelectedShop(e.target.value)}
          >
            <option value="">Select a shop</option>
            {shops.length > 0 ? (
              shops.map(shop => (
                <option key={shop._id} value={shop._id}>{shop.name}</option>
              ))
            ) : (
              <option value="">No shops available</option>
            )}
          </select>
        </div>
        {selectedShop && (
          <div className="products-table-container">
            <h3>
              Products for 
              {shops.find(shop => shop._id === selectedShop)?.name || 'Shop'}
            </h3>
            <table className="products-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Title</th>
                  <th>Number of Products</th>
                  <th>Availability</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product, index) => (
                    <tr key={product._id}>
                      <td>{index + 1}</td>
                      <td>{product.name}</td>
                      <td>{product.stockNumbers}</td>
                      <td>{product.stockNumbers > 0 ? 'In Stock' : 'Out of Stock'}</td>
                      <td><button>Edit Product</button></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No products available</td>
                  </tr>
                )}
                <tr>
                  <td colSpan="5">
                    <button onClick={() => console.log('Add Product')}>Add Product</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
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
                onAddOrUpdate={handleAddOrUpdateAddress}
                showAddAddressForm={showAddAddressForm}
                onToggleAddAddressForm={() => setShowAddAddressForm(!showAddAddressForm)}
              />
            </div>
          </div>
        );
      case 'Orders':
        return <div>Orders content is empty for now</div>;
      case 'My Shop':
        return renderMyShopContent();
      case 'Inbox':
        return <div>Inbox content is empty for now</div>;
      default:
        return <div>Select a tab to view content</div>;
    }
  };

  return (
    <div className="user-account">
      <div className="tabs">
        <button onClick={() => setActiveTab('Profile')}>
          <FaUser /> Profile
        </button>
        <button onClick={() => setActiveTab('Orders')}>
          <FaInbox /> Orders
        </button>
        <button onClick={() => setActiveTab('My Shop')}>
          <FaStore /> My Shop
        </button>
        <button onClick={() => setActiveTab('Inbox')}>
          <FaBox /> Inbox
        </button>
      </div>
      <div className="tab-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default UserAccount;
