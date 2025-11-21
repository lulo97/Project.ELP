export async function getTranscript(video_id) {
    const result = await fetch(`/api/youtube/transcript?video_id=${video_id}`);
    const result_json = await result.json();
    return result_json;
}

export async function getAudio(video_id) {
    const result = await fetch(`/api/youtube/audio?video_id=${video_id}`);
    const result_json = await result.json();
    return result_json;
}

export async function getAllAudios(video_id) {
    const result = await fetch(`/api/youtube/get_all_audios?video_id=${video_id}`);
    const result_json = await result.json();
    return result_json;
}