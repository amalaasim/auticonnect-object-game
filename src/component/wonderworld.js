import * as React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import { motion } from "framer-motion";

import bg from '../assests/background.png';
import logo from '../assests/logo.png';
import setting from '../assests/setting.png';
import contact from '../assests/contact.png';
import search from '../assests/search.png';
import refresh from '../assests/refresh.png';
import settings from '../assests/settings.png';
import cookie from '../assests/cookies.png';
import car from '../assests/car.png';
import shoe from '../assests/shoe.png';
import ball from '../assests/balls.png';
import back from '../assests/back.png';
import star from '../assests/1star.png';
import click from '../assests/click.png';
import end from '../assests/endtatoo.png';
import backbg from '../assests/backbg.png';
import object from '../assests/objlearn.mpeg'; // Your sound file
import objecturdu from '../assests/learnobjecturdu.mp4';
function Wonderworld() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const audioRef = useRef(null);

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


  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.3 }}
      style={{ minHeight: "100vh", backgroundColor: "transparent" }}
    >
      <Box sx={{ cursor: `url(${click}) 122 122, auto` }}>
        <Box
          sx={{
            backgroundImage: `url(${bg})`,
            width: "100%",
            height: "733px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            position: "relative",
            backgroundPosition: "center",
          }}
        >
          {/* Top bar */}
          <Paper
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: "5%",
              paddingRight: "5%",
              borderRadius: "10px",
              border: "none",
              background: "linear-gradient(10deg, rgba(5, 8, 7, 0.6) 0%, rgba(11,61,46,0.4) 100%)",
            }}
          >
            <Box component="img" sx={{ width: { lg: "17%", md: "25%", sm: "29%", xs: "27%" }, marginTop: { lg: "1.5%", md: "2%", sm: "3%", xs: "43%" } }} src={logo} />
            <Box sx={{ display: "flex", flexDirection: "row", gap: "0.5rem" }}>
              {[setting, contact, search, refresh, settings].map((img, i) => (
                <Box key={i} component="img" sx={{ width: { lg: "45.23px", md: "25%", sm: "29%", xs: "40px" }, height: "45.23px", marginTop: { lg: "27px", md: "30px", sm: "6%", xs: "205px" } }} src={img} />
              ))}
            </Box>
          </Paper>

          {/* Select object title */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box component='img' sx={{ marginLeft: {lg:"584px",sm:"28%"}, marginTop: "30px", width: "350px", height: "70px", "&:hover": { transform: "scale(1.08)", boxShadow: "0 10px 25px rgba(0,0,0,0)" } }} src={backbg} />
            <Typography sx={{
              fontSize: i18n.language === "ur" ? "45px" : "33px",
              marginTop: {lg:i18n.language === "ur" ? "-4.4%" :"-4%",sm:i18n.language === "ur" ? "-8.3%" :"-7%"},
              paddingTop: "0.5%",
              marginLeft: {lg:"40.2%",sm:"32%"},
              fontStyle: "normal",
              lineHeight: "90%",
              fontFamily: i18n.language === "ur" ? "JameelNooriNastaleeq" :'chewy',
              letterSpacing: "1px",
              color: "rgb(15, 21, 27,0.8)",
              "&:hover": { transform: "scale(1.08)", boxShadow: "0 10px 25px rgba(0,0,0,0)" },
              opacity: "0.9",
            }}>
              {t("selectObjectTitle")}
            </Typography>
          </Box>

          {/* Object selection */}
          <Box sx={{ display: "flex", flexDirection: "row", marginLeft: {lg:"-13%",sm:"-20%"}, marginTop: "1%", gap: {lg:"1.58rem",sm:"0.3rem"} }}>
            <Box sx={{ display: "flex", flexDirection: "column", "&:hover": { transform: "scale(1.08)", boxShadow: "0 10px 25px rgba(0,0,0,0)" } }}>
              <Box component='img' onClick={() => navigate("/learnobject")} sx={{ width: { lg: "240.59px",sm:"190px" }, height: {lg:"240px",sm:"200px"}, marginTop: {lg:"50px",sm:"25%"}, marginLeft: {lg:"450px",sm:"150px"}, borderRadius: {lg:"200.58px",sm:"20%"} }} src={cookie} />
              <Box component='img' sx={{ width: { lg: "240.59px",sm:"190px" }, height: {lg:"240px",sm:"190px"}, marginTop: "-130px", marginLeft:{lg:"450px",sm:"150px"}, borderRadius: "200.58px" }} src={star} />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box component='img' onClick={() => navigate("/learnobjectcar")} sx={{ width: { lg: "240.59px",sm:"190px" }, height:{lg:"240px",sm:"200px"}, marginTop: {lg:"50px",sm:"45%"}, borderRadius: "200.58px", "&:hover": { transform: "scale(1.12)", boxShadow: "0 10px 25px rgba(0,0,0,0)" } }} src={car} />
            </Box>

            <Box component='img' onClick={() => navigate("/learnobjshoe")} sx={{ width: { lg: "240.59px",sm:"190px" }, height: {lg:"240px",sm:"200px"}, marginTop: {lg:"50px",sm:"10%"}, borderRadius: "200.58px", transition: "transform 0.3s ease, box-shadow 0.3s ease", "&:hover": { transform: "scale(1.12)", boxShadow: "0 10px 25px rgba(0,0,0,0)" } }} src={shoe} />

            <Box component='img' onClick={() => navigate("/learnobjball")} sx={{ width: { lg: "230.59px",sm:"160px" }, height: {lg:"240px",sm:"180px"}, marginTop: {lg:"50px",sm:"11%"}, "&:hover": { transform: "scale(1.12)", boxShadow: "0 10px 25px rgba(0,0,0,0)" } }} src={ball} />
          </Box>

          {/* Bottom section */}
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingLeft: "1%", paddingRight: "5%" }}>
            <Box component="img" onClick={() => navigate("/English")} sx={{ width: {lg:"250px",sm:"200px"}, height:{lg:"303px",sm:"300px"}, marginLeft: {lg:"80px",sm:"20px"}, marginTop: i18n.language === "ur" ? "-9.5%" : "-9.85%", transition: "transform 0.3s ease, box-shadow 0.3s ease", "&:hover": { transform: "scale(1.08)", boxShadow: "0 10px 25px rgba(0,0,0,0)" } }} src={back} />
            <Typography sx={{ fontSize: i18n.language === "ur" ? "60px" : "65px", marginTop: {lg:"-2.5%",sm:"4.5%"}, marginLeft: {lg:"-38.6%",sm:i18n.language === "ur" ? "-20.3%":"-23%"}, fontStyle: "normal", lineHeight: "90%", fontFamily: i18n.language === "ur" ? "JameelNooriNastaleeq" :'Chewy', letterSpacing: "1px", color: "rgb(15, 21, 27,0.8)", "&:hover": { transform: "scale(1.08)", boxShadow: "0 10px 25px rgba(0,0,0,0)" }, opacity: "0.9" }}>
              {t("back")}
            </Typography>
            <Box component="img" sx={{ width: {lg:"285px",sm:"233px"}, height: "275px", marginLeft: {lg:"500px",sm:"330px"}, marginTop: {lg:"-113px",sm:"-46px"} }} src={end} />
          </Box>

          {/* Audio element */}
<audio
  ref={audioRef}
  src={i18n.language === "ur" ? objecturdu : object}
  preload="auto"
/>
        </Box>
      </Box>
    </motion.div>
  );
}

export default Wonderworld;
