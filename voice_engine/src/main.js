import { KokoroTTS } from "kokoro-js";

const tts = await KokoroTTS.from_pretrained(
  "onnx-community/Kokoro-82M-ONNX",
  { dtype: "q8",device:'wasm' }
);


const text = "is there a way to use kokoro.js locally without depending on internet and bundle it with vite so node js codes can run in browser for kokoro";
const audio = await tts.generate(text, { voice: "af_sky" });

// Convert to Blob, then create a temporary download link
const blob = await audio.toBlob();
const url = URL.createObjectURL(blob);

const a = document.createElement("a");
a.href = url;
a.download = "prime_noun.wav";   // The file name for the downloaded file
document.body.appendChild(a);
a.click();

// Clean up
document.body.removeChild(a);
URL.revokeObjectURL(url);
