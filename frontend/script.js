/**
 * Indian Supermarket System - Shared Helper Utilities
 */

// Format Indian Currency (₹ INR)
function formatCurrency(amount) {
  return '₹' + Number(amount || 0).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// Check logged in user
function getCurrentUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

// Logout helper
function logout() {
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}
