// Pure utility functions for WAV encoding
export function encodeWAV(samples, sampleRate) {
  const flatten = mergeBuffers(samples);
  const buffer = new ArrayBuffer(44 + flatten.length * 2);
  const view = new DataView(buffer);

  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + flatten.length * 2, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, 'data');
  view.setUint32(40, flatten.length * 2, true);

  floatTo16BitPCM(view, 44, flatten);

  return new Blob([view], { type: 'audio/wav' });
}

function mergeBuffers(audioData) {
  const length = audioData.reduce((acc, cur) => acc + cur.length, 0);
  const result = new Float32Array(length);
  let offset = 0;
  for (let i = 0; i < audioData.length; i++) {
    result.set(audioData[i], offset);
    offset += audioData[i].length;
  }
  return result;
}

function floatTo16BitPCM(output, offset, input) {
  for (let i = 0; i < input.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, input[i]));
    output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }
}

function writeString(view, offset, string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

// Utility function to convert blob to base64
export function blobToBase64(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result?.toString().split(',')[1] || '';
      resolve(base64String);
    };
    reader.readAsDataURL(blob);
  });
}