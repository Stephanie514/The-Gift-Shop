// src/components/UserAccount.js
import React, { useState, useEffect, useContext } from 'react';
import { FaUser, FaBox, FaStore, FaInbox } from 'react-icons/fa';
import axios from 'axios';
import AccountDetails from './AccountDetails';
import AddressBook from './AddressBook';
import AddProductForm from './AddProductForm'; // Import the AddProductForm component
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
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [selectedShopId, setSelectedShopId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`, {
          headers: { 'x-auth-token': token }
        });
        setUser(response.data);
        setAddresses(response.data.addresses);
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
      if (activeTab === 'My Shops' && selectedShopId) {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:5000/api/products/shop/${selectedShopId}`, {
            headers: { 'x-auth-token': token }
          });
          setProducts(response.data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      }
    };

    fetchProducts();
  }, [activeTab, selectedShopId]);

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

  const handleShopFormChange = (e) => {
    const { name, value } = e.target;
    setShopFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmitShopForm = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
  
      const response = await axios.post('http://localhost:5000/api/shops', {
        ...shopFormData,
        owner: userId
      }, {
        headers: {
          'x-auth-token': token
        }
      });
  
      setShowShopForm(false);
      setShopFormData({ name: '', address: '', description: '' });
      alert('Shop created successfully');
    } catch (error) {
      console.error('Error creating shop:', error.response ? error.response.data : error.message);
    }
  };

  const handleAddProductClick = (shopId) => {
    setSelectedShopId(shopId); // Set the ID of the shop for which to add products
    setShowAddProductForm(true); // Show the Add Product form
  };

  const renderMyShopContent = () => {
    return (
      <div className="my-shop-content">
        <button onClick={() => setShowShopForm(true)} className="open-shop-button">
          Open your very own shop
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
        {showAddProductForm && (
          <AddProductForm
            shopId={selectedShopId}
            onClose={() => setShowAddProductForm(false)}
          />
        )}
        <div className="products-table-container">
          <h3>Products</h3>
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
              {products.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.stockNumbers}</td>
                  <td>{product.stockNumbers > 0 ? 'In Stock' : 'Out of Stock'}</td>
                  <td><button>Edit Product</button></td>
                </tr>
              ))}
              <tr>
                <td colSpan="5">
                  <button onClick={() => handleAddProductClick(user.shops[0]._id)}>
                    Add Product
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
                onAddOrUpdateAddress={handleAddOrUpdateAddress}
                showAddAddressForm={showAddAddressForm}
                setShowAddAddressForm={setShowAddAddressForm}
              />
            </div>
          </div>
        );
      case 'Orders':
        return <div>This is empty for now</div>;
      case 'My Shops':
        return renderMyShopContent();
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
        <button onClick={() => setActiveTab('My Shops')} className={activeTab === 'My Shops' ? 'active' : ''}>
          <FaStore /> My Shops
        </button>
        <button onClick={() => setActiveTab('Inbox')} className={activeTab === 'Inbox' ? 'active' : ''}>
          <FaInbox /> Inbox
        </button>
      </div>
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
};

export default UserAccount;
