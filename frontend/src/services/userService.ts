import { User, CreateUserData, UpdateUserData } from '@/types/user';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const userService = {
  // Get all users
  async getUsers(): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/api/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  // Create user
  async createUser(userData: CreateUserData): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create user');
    }
    return response.json();
  },

  // Update user
  async updateUser(id: number, userData: UpdateUserData): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update user');
    }
    return response.json();
  },

  // Delete user
  async deleteUser(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete user');
    }
  },
};