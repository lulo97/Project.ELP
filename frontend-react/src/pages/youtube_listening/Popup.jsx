import { useState, useEffect } from "react";
import { CommonPopup } from "../../components/CommonPopup";
import { getAllAudios } from "../../services/youtube";
import { Button } from "../../components/Button";

export function Popup({ show, title, handleClose, setState }) {
  const [videos, setVideos] = useState(null);

  async function fetchData() {
    try {
      const result = await getAllAudios();

      if (result.error) {
        message({ type: "error", text: result.error });
        return;
      }

      const new_videos = await Promise.all(
        result.data.map(async (videoId) => {
          const res = await fetch(
            `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
          );
          const data = await res.json();
          return { id: videoId, title: data.title };
        })
      );

      setVideos(new_videos);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (!videos) return null;

  return (
    <CommonPopup
      height="80%"
      show={show}
      title={title}
      handleClose={handleClose}
      isShowConfirmButton={false}
    >
      <div className="max-h-[400px] overflow-y-auto space-y-3">
        {videos.map((video, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-white border border-gray-200 rounded-lg shadow-sm p-3 hover:shadow-md transition-shadow"
          >
            <a
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 pr-4 text-gray-800 font-medium hover:underline hover:text-blue-500"
            >
              {video.title}
            </a>

            <Button
              text="Import"
              onClick={() => {
                setState((old_state) => ({
                  ...old_state,
                  openPopup: false,
                  youtube_id: video.id,
                }));
              }}
            />
          </div>
        ))}
      </div>
    </CommonPopup>
  );
}
