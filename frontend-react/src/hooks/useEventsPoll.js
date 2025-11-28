import { useEffect, useRef, useState, useCallback } from "react";

/*
Pooling data from server
Sending old data to server to compare with newer data. If server detect new data then return response.
Have a flag to stop pooling (status = DONE)
*/
export function useEventsPoll() {
  const [data, setData] = useState(null);

  //Using useRef to prevent rerender
  const pollingRef = useRef(false);
  const eventIdRef = useRef(null);
  const oldEventRef = useRef(null);

  useEffect(() => {
    return () => {
      pollingRef.current = false;
    };
  }, []);

  function startPooling(id) {
    if (!id) return;

    setData(null);

    eventIdRef.current = id;
    oldEventRef.current = null;
    pollingRef.current = true;

    async function poll() {
      while (pollingRef.current) {
        const _old_event = oldEventRef.current || { data: [], error: "" };

        const params = new URLSearchParams({
          id: eventIdRef.current,
          old_event: JSON.stringify(_old_event),
          second_delay: 1,
        });

        const result = await fetch(`/api/ai/events_poll?${params.toString()}`);

        /*
"data": [
  {
      "id": "b0e1a40c-6b8b-452b-a441-dc41275caddb",
      "parent_id": "9b4a4ef2-8499-42b2-9771-6cf8d33b5792",
      "feature": "GENERATE_QUESTION",
      "status": "PROCESS",
      "data": "Extracting sentence chunk",
      "created_at": "2025-11-28 04:35:49.966"
  },
],
"error": "",
        */
        const result_json = await result.json();

        if (result_json.error) {
          console.warn("Polling error:", result_json);
          break;
        }

        setData(result_json.data);

        oldEventRef.current = result_json;

        const is_done = !!result_json.data.find((ele) =>
          ["DONE", "ERROR"].includes(ele.status)
        );

        if (is_done) {
          pollingRef.current = false;
          break;
        }
      }
    }

    poll();
  }

  function getEventsData() {
    if (!data || data.length == 0) return null;
    const last_item = data[0];
    const seperator = last_item.data ? " - " : "";
    return `[${last_item.status}${seperator}${last_item.data}]`;
  }

  return {
    getEventsData,
    startPooling,
  };
}
