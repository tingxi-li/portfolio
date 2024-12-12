import { Fragment, useRef } from "react";
import TypeTitle from "../TypeText";
import { styled } from "@mui/material/styles";
import Browser, { Chrome } from "react-browser-ui";
import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import photography_data from "./LifeData.json";
import jerseyData from "./JerseyData.json"
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import LazyImage from "../Lazy/LazyImage";
import { motion, useScroll, useTransform } from "framer-motion";
import CameraIcon from '@mui/icons-material/Camera';
import React from 'react';
const { Tab, AddButton } = Chrome;

const BrowserContainer = styled(Box)(({ theme }) => ({
    fontWeight: 500,
    backgroundColor: "#fff",
    color: "#111",
    cursor: "default",
    overflow: "hidden",
    borderRadius: "1.2rem",
    margin: theme.spacing(4, 0, 8),
    position: "relative",
}));

// const BrowserTabBox = styled(Box)(({ theme }) => ({
//     position: "relative",
//     zIndex: 1,
//     backgroundColor: "transparent",
//     overflow: "auto",
//     colorScheme: "light",
//     "& .MuiImageList-root": {
//         marginBottom: 0,
//     },
// }));

const LifeImgItem = ({ alt, src, place, idx, href }) => {
    const itemRef = useRef();
    const { scrollYProgress } = useScroll({
        target: itemRef,
        offset: ["start end", "end end"],
    });

    const margin = 368 - 16 * idx;

    const y = useTransform(scrollYProgress, [0, 1], [margin, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.1, 1]);

    return (
        <ImageListItem key={alt} sx={{ overflow: "visible" }} ref={itemRef}>
            <motion.div whileHover={{ scale: 1.1 }} style={{ y, opacity, borderRadius: "1.6rem", overflow: "hidden" }}>
                <a href={href || src}>
                    <LazyImage src={src} alt={alt} margin={margin + 128} trim={1} width="100%" />
                </a>
                <ImageListItemBar
                    title={alt}
                    subtitle={`@${place}`}
                    actionIcon={
                        <IconButton href={src} sx={{ marginTop: 0.5 }}>
                            <CameraIcon />
                        </IconButton>
                    }
                    position="below"
                    sx={(theme) => ({
                        fontSize: "1.2rem",
                        [theme.breakpoints.up("md")]: {
                            fontSize: "1.35rem",
                        },
                        ".MuiImageListItemBar-title": {
                            fontSize: "1em",
                            lineHeight: 1.4,
                        },
                        ".MuiImageListItemBar-subtitle": {
                            fontSize: "0.9em",
                            color: "#cacaca",
                            
                        },
                    })}
                />
            </motion.div>
        </ImageListItem>
    );
};

const filterJerseysByAwayHome = (data, type) => {
    if (!Array.isArray(data)) return [];
    return data.filter(jersey => jersey['homeAway'] === type);
};

const JerseyImgItem = ({ alt, src, year, team, league, homeAway, idx, href }) => {
    const itemRef = useRef();
    const { scrollYProgress } = useScroll({
        target: itemRef,
        offset: ["start end", "end end"],
    });

    const margin = 368 - 16 * idx;

    const y = useTransform(scrollYProgress, [0, 1], [margin, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.1, 1]);

    return (
        <ImageListItem key={alt} sx={{ overflow: "hidden" }} ref={itemRef}>
            <motion.div whileHover={{ scale: 1.2 }} style={{ y, opacity, borderRadius: "1.6rem", overflow: "visible" }}>
                <a href={href || src}>
                    <LazyImage src={src} alt={alt} margin={margin + 128} trim={1} width="100%" />
                </a>
                <ImageListItemBar
                    title={alt}
                    subtitle={`@${league}`}
                    actionIcon={
                        <IconButton href={src} sx={{ marginTop: 0.5 }}>
                            {/* <CameraIcon /> */}
                        </IconButton>
                    }
                    position="below"
                    sx={(theme) => ({
                        display: "flex", // Enables flexbox for centering
                        flexDirection: "column",
                        alignItems: "center", // Centers text horizontally
                        textAlign: "center", // Centers text within the flex container
                        fontSize: "1.2rem", // Adjusts overall font size
                        gap: "4px", // Adds spacing between title and subtitle
                        ".MuiImageListItemBar-title": {
                            fontSize: "1em",
                            lineHeight: 1.4,
                        },
                        ".MuiImageListItemBar-subtitle": {
                            fontSize: "0.9em",
                            color: "#cacaca",
                        },
                    })}
                />
            </motion.div>
            
        </ImageListItem>
    );
};


  

export default function Life(props) {

    const smbk = useMediaQuery("(min-width: 480px)");
    
    const homeJerseys = filterJerseysByAwayHome(jerseyData, 'home');
    const awayJerseys = filterJerseysByAwayHome(jerseyData, 'away');

    const citylogo = jerseyData.find(jersey => jersey.team === 'citylogo');
  


    return (
        <Fragment>
            <TypeTitle title="aside from work, i enjoy" id="gallery" />
            <BrowserContainer
                sx={{
                    backgroundColor: "#131313", 
                    color: "#565656",
                    borderRadius: "12px", // Optional: Adjust border radius
                }}
            >
                <Browser
                    type="chrome"
                    showHeader={false}
                    activeTabKey="hkp"
                    tabEnd={(
                        <Fragment>
                            <div className="h-px bg-gray-200 my-2" />
                            <AddButton />
                        </Fragment>
                    )}
                >
                    <Tab key="hkp" title="⚽️🩵">
                    <div
                            className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm text-center"
                            style={{
                                marginTop: "12px", 
                                display: "flex", // Enables flexbox for centering
                                flexDirection: "column",
                                alignItems: "center", // Centers text horizontally
                                textAlign: "center", // Centers text within the flex container// Space between the image and text
                                fontSize: "1.3rem",
                                color: "#b8b8b8"
                            }}
                            >
                            i enjoy soccer games and i have a small but growing collection of jerseys
                            </div>
                    <div className="flex flex-col items-center justify-center min-h-[72vh] p-4"
                        style={{
                            margin: "16px auto", // Adds vertical spacing and centers the container
                            maxWidth: "150px",  // Limits the maximum width of the container
                            }}
                        >
                        {citylogo ? (
                        <motion.div
                            whileHover={{ scale: 1.1 }} // Hover scaling effect
                            className="relative flex justify-center items-center rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                            style={{
                            margin: "10px auto", // Adds vertical spacing and centers the container
                            overflow: "visible", // Ensures the scaling image doesn't overflow its container
                            borderRadius: "1.6rem", // Matches the rounded corners
                            }}
                        >
                            <a href={citylogo.href || citylogo.src}>
                            <img
                                src={citylogo.src}
                                alt={citylogo.alt}
                                style={{
                                maxWidth: "100%", // Ensures responsiveness
                                width: "200px", // Adjustable width
                                height: "auto", // Maintains aspect ratio
                                }}
                            />

                            </a>
                        </motion.div>
                        
                        ) : null}

                    </div>
                    <div
                            className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm text-center"
                            style={{
                                marginTop: "12px", 
                                display: "flex", // Enables flexbox for centering
                                flexDirection: "column",
                                alignItems: "center", // Centers text horizontally
                                textAlign: "center", // Centers text within the flex container// Space between the image and text
                                fontSize: "1.3rem",
                                color: "#d5d5d6"
                            }}
                            >

                                    
                        </div>
                    </Tab>

                    <Tab key="home" title="home">
                    <ImageList variant="standard" cols={smbk ? 3 : 1} gap={"0px"} sx={{
                        marginTop: 0,
                        marginBottom: -1,
                        overflow: "visible",
                    }}>
                        {homeJerseys.map((props, idx) => (
                            <JerseyImgItem key={idx} idx={idx} {...props} />
                        ))}
                    </ImageList>
                    </Tab>

                    <Tab key="away" title="away">
                    <ImageList variant="standard" cols={smbk ? 3 : 1} gap={"0px"} sx={{
                        marginTop: 0,
                        marginBottom: -1,
                        overflow: "visible",
                    }}>
                        {awayJerseys.map((props, idx) => (
                            <JerseyImgItem key={idx} idx={idx} {...props} />
                        ))}
                    </ImageList>
                    </Tab>

                </Browser>
                {/* <Box sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 0,
                }} >
                    <CircularProgress color="secondary" />
                </Box> */}
            </BrowserContainer>
            <Typography sx={{
                textAlign: "center",
                display: "block",
                fontSize: "1.2rem",
                color: "#aaa",
            }}>
                Love documenting my life with a phone or camera while traveling, researching, and even during moments at home.            </Typography>
            <ImageList variant="masonry" cols={smbk ? 2 : 1} gap={"max(3.2rem, 6.4vw)"} sx={{
                marginTop: 8,
                marginBottom: 5,
                overflow: "visible",
            }}>
                {photography_data.map((props, idx) => (
                    <LifeImgItem key={idx} idx={idx} {...props} />
                ))}
            </ImageList>
        </Fragment>
    );
};