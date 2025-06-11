'use client';

import { useState, useEffect, useMemo } from 'react';
import { User, CreateUserData, UpdateUserData } from '@/types/user';
import { userService } from '@/services/userService';
import UserList from '@/components/UserList';
import UserForm from '@/components/UserForm';
import SearchBar from '@/components/SearchBar';
import Toast from '@/components/Toast';

interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info';
  show: boolean;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [toast, setToast] = useState<ToastState>({ message: '', type: 'info', show: false });

  // Filter users based on search term and role
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = !searchTerm || 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRole = !roleFilter || user.role === roleFilter;
      
      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, roleFilter]);

  // Load users on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type, show: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const fetchedUsers = await userService.getUsers();
      setUsers(fetchedUsers);
      if (fetchedUsers.length === 0) {
        showToast('No users found. Create your first user!', 'info');
      }
    } catch (err) {
      showToast('Failed to load users. Please try again.', 'error');
      console.error('Error loading users:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUser = async (userData: CreateUserData) => {
    try {
      setIsSubmitting(true);
      const newUser = await userService.createUser(userData);
      setUsers([newUser, ...users]);
      setIsFormOpen(false);
      showToast(`User "${newUser.name}" created successfully!`, 'success');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create user';
      showToast(errorMessage, 'error');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateUser = async (userData: UpdateUserData) => {
    if (!editingUser) return;
    
    try {
      setIsSubmitting(true);
      const updatedUser = await userService.updateUser(editingUser.id, userData);
      setUsers(users.map(user => user.id === editingUser.id ? updatedUser : user));
      setIsFormOpen(false);
      setEditingUser(null);
      showToast(`User "${updatedUser.name}" updated successfully!`, 'success');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update user';
      showToast(errorMessage, 'error');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (userToDelete: User) => {
    if (!confirm(`Are you sure you want to delete ${userToDelete.name}?`)) {
      return;
    }

    try {
      await userService.deleteUser(userToDelete.id);
      setUsers(users.filter(user => user.id !== userToDelete.id));
      showToast(`User "${userToDelete.name}" deleted successfully!`, 'success');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete user';
      showToast(errorMessage, 'error');
    }
  };

  const openEditForm = (user: User) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const openCreateForm = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingUser(null);
  };

  const handleRefresh = () => {
    loadUsers();
    showToast('Users refreshed!', 'info');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
              <p className="mt-2 text-gray-600">Manage your users and their roles</p>
            </div>
            <div className="mt-4 sm:mt-0 flex gap-3">
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
              <button
                onClick={openCreateForm}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add User
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          roleFilter={roleFilter}
          onRoleFilterChange={setRoleFilter}
          userCount={filteredUsers.length}
        />

        {/* User List */}
        <UserList
          users={filteredUsers}
          onEdit={openEditForm}
          onDelete={handleDeleteUser}
          isLoading={isLoading}
        />

        {/* Empty State for Filtered Results */}
        {!isLoading && filteredUsers.length === 0 && users.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search terms or filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setRoleFilter('');
              }}
              className="mt-3 text-blue-600 hover:text-blue-500 text-sm font-medium"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* User Form Modal */}
        {isFormOpen && (
          <UserForm
            user={editingUser}
            onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
            onCancel={closeForm}
            isLoading={isSubmitting}
          />
        )}

        {/* Toast Notifications */}
        {toast.show && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={hideToast}
          />
        )}
      </div>
    </div>
  );
}