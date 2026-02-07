import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useRef } from "react";
import { AnimatePresence } from "framer-motion";
import Cookie from "./component/showCookie";
import Lanuguage from "./component/language";
import Wonderworld from "./component/wonderworld";
import Learnobj from "./component/learnobject";
import Learnobjcar from "./component/learnobjectcar";
import Learnobjshoe from "./component/learnobjshoe";
import Learnobjball from "./component/learnobjball";
import Find from "./component/find";
import Findcar from "./component/findcar";
import Findshoe from "./component/findshoe";
import Findball from "./component/findball";
import Final from "./component/final";
import English from "./component/English";
import Verifyshoe from "./component/shoeverify";
import voice from "./assests/audio_file.mpeg";
import click from "./assests/click_Audio.wav";
import { UploadShoe } from "./component/uploadshoe";
import Show from "./component/showShoe";
import YourShoe from "./component/yourShoe";
import Ball from './component/showball';
import Car from "./component/car";

/* 🔹 This component holds Routes + animation */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Lanuguage />} />
        <Route path="/english" element={<English />} />
        <Route path="/wonderworld" element={<Wonderworld />} />
        <Route path="/learnobject" element={<Learnobj />} />
        <Route path="/learnobjectcar" element={<Learnobjcar />} />
        <Route path="/learnobjshoe" element={<Learnobjshoe />} />
        <Route path="/learnobjball" element={<Learnobjball />} />
        <Route path="/find" element={<Find />} />
        <Route path="/findcar" element={<Findcar />} />
        <Route path="/findshoe" element={<Findshoe />} />
        <Route path="/findball" element={<Findball />} />
        <Route path="/final" element={<Final />} />
        <Route path="/shoeverify" element={<Verifyshoe />} />
        <Route path="/uploadshoe" element={<UploadShoe />} />
        <Route path="/showShoe" element={<Show />} />
        <Route path="/yourShoe" element={<YourShoe />} />
        <Route path="/showCookie" element={<Cookie />} />
        <Route path="/showball" element={<Ball />} />
        <Route path="/car" element={<Car />} />
        <Route path="/final/learnobject" element={<Final />} />
        <Route path="/final/learnobjectcar" element={<Final />} />
        <Route path="/final/learnobjball" element={<Final />} />
        <Route path="/final/learnobjshoe" element={<Final />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const audioRef = useRef(null);
  const clickAudioRef = useRef(null);

  // Handle first interaction to start background music at low volume
  const handleUserInteraction = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.1; // Set low volume
      audio.loop = true;
      audio.muted = false;
      if (audio.paused) {
        audio.play().catch(() => {}); // Play after interaction
      }
    }

    if (clickAudioRef.current) {
      clickAudioRef.current.currentTime = 0;
      clickAudioRef.current.play().catch(() => {}); // Play click sound
    }
  };

  return (
    <div
      className="App"
      onClick={handleUserInteraction}
      onTouchStart={handleUserInteraction}
    >
      {/* Background music */}
      <audio ref={audioRef} src={voice} preload="auto" />

      {/* Click sound */}
      <audio ref={clickAudioRef} src={click} preload="auto" />

      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
