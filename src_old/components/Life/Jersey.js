

import { useRef } from "react";
import { IconButton } from "@mui/material";
import {ImageListItem, ImageListItemBar } from "@mui/material";
import LazyImage from "../Lazy/LazyImage";
import { motion, useScroll, useTransform } from "framer-motion";
import React, {useState} from 'react';

export const JerseyImgItem = ({ alt, src, year, team, league, homeAway, idx, href }) => {
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


export const filterJerseysByAwayHome = (data, type) => {
    if (!Array.isArray(data)) return [];
    return data.filter(jersey => jersey['homeAway'] === type);
};




export const LogoImgItem = ({ alt, src, href }) => {
    const itemRef = useRef();
    const [isHovered, setIsHovered] = useState(false);
    const { scrollYProgress } = useScroll({
        target: itemRef,
        offset: ["start end", "end end"],
    });
  
    const margin = 300;
    const y = useTransform(scrollYProgress, [0, 1], [margin, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.1, 1]);
  
    return (
        <ImageListItem key={alt} sx={{ 
            overflow: "visible",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            minHeight: '250px'  // 为文字预留空间
            }} 
            ref={itemRef}>
            <motion.div 
                whileHover={{ scale: 1.1 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                style={{
                    y, 
                    opacity, 
                    borderRadius: "1.6rem", 
                    overflow: "visible",
                    position: "relative"
                }}
            >
                <a href={href || src} className="relative block flex items-center justify-center" style={{ textDecoration: 'none' }}>
                <LazyImage 
                        src={src} 
                        alt={alt} 
                        margin={margin + 128} 
                        trim={1} 
                        width="150px" 
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}
                    />
                    
                    {isHovered && (
                        <div 
                            className="absolute inset-0 flex items-center justify-center"
                            style={{
                                borderRadius: "1.6rem",
                                // backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            }}
                        >
                            <p 
                                className="text-2xl font-bold tracking-wider" 
                                style={{ 
                                    color: '#7AB2E1',
                                    fontFamily: "'Dancing Script', cursive",
                                    fontSize: '60px',  // 直接设置字体大小
                                    // position: 'relative',
                                    width: '100%',
                                    textAlign: 'center',
                                    textShadow: `
                                    0 0 0px #7AB2E1
                                `, // 初始无光晕
                                animation: 'glowEffect 4s infinite', // 添加动画

                                }}
                            >
                                {alt}
                            </p>
                            <style>
                                {`
            @keyframes glowEffect {
                0% {
                    text-shadow: 0 0 0px #7AB2E1; /* 无光晕 */
                }
                50% {
                    text-shadow: 0 0 20px #7AB2E1, 0 0 40px #7AB2E1; /* 光晕增强 */
                }
                100% {
                    text-shadow: 0 0 0px #7AB2E1; /* 光晕消失 */
                }
            }
                                `}
                            </style>
                        </div>
                    )}
                </a>
            </motion.div>
        </ImageListItem>
    );
};


