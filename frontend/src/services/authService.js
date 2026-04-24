import axiosInstance from './axios';

const authService = {
  /**
   * Register a new user
   * @param {string} name - User full name
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {string} role - User role (admin, agent, client)
   * @returns {Promise<{user, token}>}
   */
  register: async (name, email, password, role = 'client') => {
    const response = await axiosInstance.post('/auth/register', {
      name,
      email,
      password,
      role
    });
    return response.data;
  },

  /**
   * Login user with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<{user, token}>}
   */
  login: async (email, password) => {
    const response = await axiosInstance.post('/auth/login', {
      email,
      password
    });
    return response.data;
  },

  /**
   * Get current authenticated user
   * @returns {Promise<{user}>}
   */
  getCurrentUser: async () => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  },

  /**
   * Logout user (clears token from localStorage)
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export default authService;
