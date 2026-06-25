/**
 * api.js — Service layer terpusat untuk komunikasi frontend ↔ backend
 */

const BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    });

    const text = await response.text();

    let json = {};

    try {
      json = text ? JSON.parse(text) : {};
    } catch (err) {
      throw new Error(
        `Server mengembalikan response bukan JSON.\n${text.substring(0, 200)}`
      );
    }

    if (!response.ok) {
      throw new Error(
        json.message || `HTTP Error ${response.status}`
      );
    }

    return json;
  } catch (error) {
    console.error(`API Error [${path}]`, error);
    throw error;
  }
}

// ================= COMPANY =================

export const fetchCompany = () =>
  request('/api/company');

export const fetchAddresses = () =>
  request('/api/company/addresses');

// ================= PRODUCTS =================

export const fetchProducts = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return request(`/api/products${qs ? `?${qs}` : ''}`);
};

export const fetchProductById = (id) =>
  request(`/api/products/${id}`);

export const fetchCategories = () =>
  request('/api/products/categories');

// ================= FINANCE =================

export const fetchFinanceSummary = () =>
  request('/api/finance/summary');

export const fetchFinanceAnnual = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return request(`/api/finance/annual${qs ? `?${qs}` : ''}`);
};

export const fetchInvestors = () =>
  request('/api/finance/investors');

export const fetchFinanceQuarterly = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return request(`/api/finance/quarterly${qs ? `?${qs}` : ''}`);
};

// ================= DATASET =================

export const fetchSales = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return request(`/api/dataset/sales${qs ? `?${qs}` : ''}`);
};

export const fetchSalesSummary = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return request(`/api/dataset/sales/summary${qs ? `?${qs}` : ''}`);
};

export const fetchEmployees = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return request(`/api/dataset/employees${qs ? `?${qs}` : ''}`);
};

export const fetchEmployeesSummary = () =>
  request('/api/dataset/employees/summary');

export const fetchProduction = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return request(`/api/dataset/production${qs ? `?${qs}` : ''}`);
};

export const fetchProductionSummary = (params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return request(`/api/dataset/production/summary${qs ? `?${qs}` : ''}`);
};

// ================= CHATBOT =================

export const sendChatMessage = (message) =>
  request('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ message }),
  });

// ================= HEALTH =================

export const checkHealth = () =>
  request('/api/health');