'use client';

import { useState, useEffect } from 'react';

/**
 * Returns the current site's origin (e.g. "https://my-site.vercel.app")
 * dynamically — works on any hosting environment without hardcoding.
 */
export function useBaseUrl(): string {
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  return baseUrl;
}
