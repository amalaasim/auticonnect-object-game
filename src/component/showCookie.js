import * as React from 'react';
import { Box,Typography } from '@mui/material';
import learnbg from '../assests/learn_bg.png';
import board from '../assests/board.png';
import brown from '../assests/brown_board.png';
import bg from '../assests/greenbg.png';
import { useEffect, useRef } from "react";
import newgif from '../assests/finalgif.gif';
import stop from '../assests/stop.png';
import pause from '../assests/pause.png';
import retry from '../assests/retry.png';
import click from '../assests/click.png';
import backbg from '../assests/backbg.png';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate,useLocation } from "react-router-dom";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import your from '../assests/yourcookie.mpeg';
import yoururdu from '../assests/yourbiscuiturdu.mp4';

export default function Cookie() {
  const navigate = useNavigate();
  const {t}=useTranslation();
  const location = useLocation();
const audioRef = useRef(null);
const recognitionRef = useRef(null);
const retryListenRef = useRef(null);
const [speechVerified, setSpeechVerified] = React.useState(false);
const [speechStatus, setSpeechStatus] = React.useState("");
const speechVerifiedRef = useRef(false);

  useEffect(() => {
  const audio = audioRef.current;
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
    audio.volume = 1;
    audio.play().catch(() => {
      setTimeout(() => {
        audio.play().catch(() => console.log("Autoplay blocked"));
      }, 1000);
    });
  }
}, [i18n.language]);

useEffect(() => {
  speechVerifiedRef.current = speechVerified;
}, [speechVerified]);

useEffect(() => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    setSpeechStatus("Speech recognition not supported on this device.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = i18n.language === "ur" ? "ur-PK" : "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.continuous = false;

  const startListening = () => {
    if (retryListenRef.current) {
      clearTimeout(retryListenRef.current);
      retryListenRef.current = null;
    }
    setSpeechVerified(false);
    setSpeechStatus("Listening… say “cookie”");
    try {
      recognition.start();
    } catch (_) {}
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    setSpeechStatus(`Heard: ${transcript}`);
    if (transcript.includes("cookie")) {
      setSpeechVerified(true);
      speechVerifiedRef.current = true;
      setSpeechStatus("Great! You said cookie.");
      recognition.stop();
    } else {
      setSpeechVerified(false);
      speechVerifiedRef.current = false;
      setSpeechStatus("Try again: say “cookie”.");
    }
  };

  recognition.onerror = () => {
    setSpeechStatus("Couldn't hear you. Try again.");
  };

  recognition.onend = () => {
    if (!speechVerifiedRef.current) {
      retryListenRef.current = setTimeout(startListening, 800);
    }
  };

  recognitionRef.current = recognition;

  const audioEl = audioRef.current;
  if (audioEl) {
    audioEl.onended = startListening;
  } else {
    startListening();
  }

  return () => {
    if (retryListenRef.current) {
      clearTimeout(retryListenRef.current);
      retryListenRef.current = null;
    }
    if (audioEl) audioEl.onended = null;
    try {
      recognition.stop();
    } catch (_) {}
  };
}, [i18n.language]);

  // Get uploaded image from localStorage or navigation state
  const uploadedImage = location.state?.uploadedImage || localStorage.getItem("uploadedCookie");


  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.3 }}
      style={{ minHeight: "100vh" }}
    >
      <Box sx={{ cursor: `url(${click}) 122 122, auto` }}>
        <Box
          sx={{
            backgroundColor: "#0B3D2E",
            width: "100%",
            height: "733px",
            opacity: "0.9",
            position: "absolute",
            pointerEvents: "none",
          }}
        />

        <Box
          sx={{
            backgroundImage: `url(${learnbg})`,
            width: "100%",
            height: "733px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            position: "relative",
            backgroundPosition: "center",
          }}
        >
          {/* TOP NAV */}
          <Box sx={{ display: "flex", justifyContent: "space-between", marginLeft: "10%" }}>
            <Box sx={{ display: "flex" }}>
              <Box
                component="img"
                src={backbg}
                onClick={() => navigate("/learnobject")}
                sx={{
                  width: { lg: "40%", sm: "35%" },height:{ lg: "50%", sm: "40%" },
                  marginTop: {lg:"45px",sm:"65px"},
                  "&:hover": { transform: "scale(1.18)" },
                }}
              />

              <Typography
                onClick={() => navigate("/learnobject")}
                sx={{
                  fontSize: {
                    lg: i18n.language === "ur" ? "42px" : "35px",
                    sm: i18n.language === "ur" ? "32px" : "25px",
                  },
                  marginTop: {lg:"0%",sm:"9.5%"},
                 "&:hover": { transform: "scale(1.18)" },
                  paddingTop: "14%",
                  marginLeft: {lg:i18n.language === "ur" ? "-36%" : "-38%",sm:i18n.language === "ur" ? "-33%" : "-33%"},
                  fontFamily:
                    i18n.language === "ur"
                      ? "JameelNooriNastaleeq"
                      : "Chewy",
                  color: "rgba(255, 203, 143, 1)",
                  cursor: "pointer",
                }}
              >
                <KeyboardArrowLeftIcon sx={{ fontSize: 25 }} />
                {t("back")}
              </Typography>
            </Box>

            <Box sx={{ display: "flex" }}>
              <Box
                component="img"
                src={backbg}
                onClick={() => navigate("/find")}
                sx={{
                  width: { lg: "40%", sm: "35%" },
                height: { lg: "50%", sm: "40%" },
                   marginTop: {lg:"45px",sm:"65px"},
                  "&:hover": { transform: "scale(1.08)" },
                }}
              />

              <Typography
                onClick={() => {
                  if (!speechVerified) return;
                  navigate("/find");
                }}
                               sx={{
                  fontSize: {
                    lg: i18n.language === "ur" ? "42px" : "35px",
                    sm: i18n.language === "ur" ? "32px" : "25px",
                  },
                  marginTop: {lg:"0%",sm:"9.5%"},
                 "&:hover": { transform: "scale(1.18)" },
                  paddingTop: "14%",
                  marginLeft: {lg:i18n.language === "ur" ? "-36%" : "-33.5%",sm:i18n.language === "ur" ? "-27%" : "-28%"},
                  fontFamily:
                    i18n.language === "ur"
                      ? "JameelNooriNastaleeq"
                      : "Chewy",
                  color: "rgba(255, 203, 143, 1)",
                  cursor: "pointer",
                }}
              >
                {t("next")}
                <KeyboardArrowRightIcon sx={{ fontSize: 25 }} />
              </Typography>
            </Box>
          </Box>

          {/* CENTER */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box component="img" src={bg} sx={{ width: {lg: i18n.language === "ur" ? "250px" :"280px",sm:"220px"}, ml: {lg:"350px",sm:"110px"}, mt: {lg: i18n.language === "ur" ? "7%" :"5%",sm:"18%"} }} />

            <Typography
              sx={{
                fontSize: {
                  lg: i18n.language === "ur" ? "46px" : "33px",
                  sm: i18n.language === "ur" ? "40px" : "30px",
                },
                marginTop: {lg: i18n.language === "ur" ? "-8.3%" :"-9%",sm: i18n.language === "ur" ? "-14.8%" :"-15.5%"},
                marginLeft:{lg: i18n.language === "ur" ? "25.1%" :"26%",sm: i18n.language === "ur" ? "19%" :"18%"},
                width:{lg:i18n.language==="ur"?"15%":"15%",sm:i18n.language==="ur"?"25%":"25%"},
                fontFamily:
                  i18n.language === "ur"
                    ? "JameelNooriNastaleeq"
                    : "Chewy",
                color: "rgb(15,21,27,0.8)",
              }}
            >
              {t("yourcook")}
            </Typography>

            <Box component="img" src={newgif} sx={{ width:{lg:"370px",sm:"40%"}, ml: {lg:"150px",sm:"-5%"} }} />
          </Box>

          <Box component="img" src={board} sx={{ width: {lg:"659px",sm:"52%"}, ml: {lg:"723px",sm:"45%"}, mt: {lg:"-43%",sm:"-57%"} }} />

          <Typography
            sx={{
              fontSize: {
                lg: i18n.language === "ur" ? "62px" : "40px",
                sm: i18n.language === "ur" ? "34px" : "30px",
              },
              marginLeft: {lg: i18n.language === "ur" ? "60%" :"880px",sm: i18n.language === "ur" ? "62%" :"53%"},
              marginTop: {lg: i18n.language === "ur" ? "-35%" :"-34%",sm: i18n.language === "ur" ? "-45%" :"-44%"},
              marginBottom:"1%",
              fontFamily:
                i18n.language === "ur"
                  ? "JameelNooriNastaleeq"
                  : "Chewy",
              color: "rgba(130, 77, 31, 1)",
            }}
          >
            {t("learnToSay")}
          </Typography>

          <Box component="img" src={brown} sx={{ width:{lg:"518px",sm:"35%"},height:{lg:"250px",sm:"20%"}, ml: {lg:"780px",sm:"53%"} }} />

          {uploadedImage && (
            <Box
              component="img"
              src={uploadedImage}
              sx={{ width: {lg:"200px",sm:"100px"}, height: {lg:"180px",sm:"100px"}, ml:{lg:"935px",sm:"64%"}, mt: {lg:"-19%",sm:"-23%"} }}
            />
          )}
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              bottom: { lg: "22px", sm: "12px" },
              backgroundColor: "rgba(0,0,0,0.55)",
              padding: "8px 14px",
              borderRadius: "14px",
              zIndex: 10,
            }}
          >
            <Typography
              sx={{
                fontSize: { lg: "16px", sm: "14px" },
                fontFamily: "Chewy",
                color: speechVerified ? "#B9FFB3" : "#FFE1B3",
              }}
            >
              {speechVerified ? "Verified: cookie ✅" : "Say “cookie” to continue"}
            </Typography>
            {speechStatus && (
              <Typography
                sx={{
                  fontSize: { lg: "12px", sm: "11px" },
                  fontFamily: "Chewy",
                  color: "#fff",
                  opacity: 0.9,
                  marginTop: "4px",
                }}
              >
                {speechStatus}
              </Typography>
            )}
          </Box>
        <Box component='img' sx={{ width: {lg:"50px",sm:"27px"}, height: {lg:"50px",sm:"27px"}, marginLeft: {lg: i18n.language === "ur" ? "62.5%" :"940px",sm:"64%"}, marginTop: {lg: i18n.language === "ur" ? "-6%" :"-5.5%",sm:"-11%"}, "&:hover": { transform: "scale(1.28)", boxShadow: "0 10px 25px rgba(0,0,0,0)" } }} src={stop} />
        <Box component='img' sx={{ width: {lg: i18n.language === "ur" ? "60px" :"65px",sm:"35px"}, height: {lg: i18n.language === "ur" ? "60px" :"65px",sm:"35px"}, marginLeft: {lg: i18n.language === "ur" ? "67%" :"1000px",sm:"69%"}, marginTop: {lg: i18n.language === "ur" ? "-9%" :"-8.5%",sm:"-17.5%"}, "&:hover": { transform: "scale(1.28)", boxShadow: "0 10px 25px rgba(0,0,0,0)" } }} src={pause} />
        <Box component='img' sx={{ width: {lg:"50px",sm:"27px"}, height: {lg:"50px",sm:"27px"}, marginLeft: {lg: i18n.language === "ur" ? "72%" :"1075px",sm:"74.5%"}, marginTop: {lg: i18n.language === "ur" ? "-12.3%" :"-11.5%",sm:"-23.5%"}, "&:hover": { transform: "scale(1.28)", boxShadow: "0 10px 25px rgba(0,0,0,0)" } }} src={retry} />
<audio
  ref={audioRef}
  src={i18n.language === "ur" ? yoururdu : your}
  preload="auto"
/>
        </Box>
      </Box>
    </motion.div>
  );
}
