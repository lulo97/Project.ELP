import { useEffect, useState, useRef } from 'react';

/**
 * Custom React hook for handling Server-Sent Events (SSE)
 * @returns {{ data: any, error: any, isConnected: boolean }}
 */
export function useEventSource() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const sourceRef = useRef(null);

  useEffect(() => {

    const source = new EventSource("/api/events");
    sourceRef.current = source;

    source.onopen = () => {
      setIsConnected(true);
      console.log(`[SSE] Connected`);
    };

    source.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        setData(parsed);
      } catch {
        setData(event.data);
      }
    };

    source.onerror = (err) => {
      console.error(`[SSE] Error`, err);
      setError(err);
      setIsConnected(false);
      // SSE auto-reconnects, no manual retry needed
    };

    // Cleanup on unmount
    return () => {
      console.log(`[SSE] Closing connection`);
      source.close();
    };
  }, []);

  return { data, error, isConnected };
}
