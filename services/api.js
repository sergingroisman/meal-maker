import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:7071/api',
  timeout: 5000, // Timeout if necessary
  header: {
    'ContentType': 'application/json',
    // Add all custom headers here
  },
})

export const fetchRestaurant = async (partner_id = 1, options = {}) => {
  try {
    const response = await api(`/get-restaurant/${partner_id}`, options);
    return response.data;
  } catch (error) {
    console.error('Error retrieving data:', error);
    throw new Error('Could not get data');
  }
}

export const fetchMenu = async (partner_id = 1, options = {}) => {
  try {
    const response = await api(`/get-restaurant/${partner_id}`, options);
    return response.data;
  } catch (error) {
    console.error('Error retrieving data:', error);
    throw new Error('Could not get data');
  }
}