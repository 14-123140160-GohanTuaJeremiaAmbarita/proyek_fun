import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * useApi — hook generik untuk fetch data dari API service.
 *
 * @param {Function} apiFn   — fungsi dari api.js, misal: fetchCompany
 * @param {Array}    deps    — dependency array (seperti useEffect)
 * @param {Object}   options — { immediate: bool, params: object }
 *
 * @example
 * const { data, loading, error, refetch } = useApi(fetchCompany);
 * const { data, loading } = useApi(() => fetchProducts({ kategori: 'power_cable' }), []);
 */
export function useApi(apiFn, deps = [], options = {}) {
  const { immediate = true } = options;

  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError]     = useState(null);

  // Simpan referensi apiFn agar tidak trigger infinite loop
  const apiFnRef = useRef(apiFn);
  apiFnRef.current = apiFn;

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFnRef.current();
      setData(result.data);
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan.');
      setData(null);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    if (immediate) execute();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [execute]);

  return { data, loading, error, refetch: execute };
}

/**
 * useApiLazy — seperti useApi tapi tidak auto-fetch.
 * Gunakan untuk aksi on-demand (submit form, klik tombol).
 *
 * @example
 * const { execute, loading, error, data } = useApiLazy();
 * await execute(() => sendChatMessage('halo'));
 */
export function useApiLazy() {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const execute = useCallback(async (apiFn) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFn();
      setData(result.data);
      return result.data;
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan.');
      setData(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, execute };
}