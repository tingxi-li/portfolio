import { Box } from "@mui/material";
import TypeTitle from "../TypeText";
import { Fragment } from "react";

export default function Resume(props) {
    return (
        <Fragment>
            <TypeTitle title="my (likely outdated) cv" id="cv" />
            <Box sx={{
                marginTop: 4,
                marginBottom: 9,
                height: "min(calc(100vw + 12rem), 72rem)",
                position: "relative",
                borderRadius: "1.6rem",
                overflow: "hidden",
                // backgroundColor: "#ce93d8",
            }}>
                <iframe
                    width="100%"
                    height="100%"
                    frameBorder={0}
                    title="tingxi's cv"
                    src="/tingxi-cv.pdf"
                    allowFullScreen
                    loading="lazy"
                />
            </Box>
        </Fragment>
    );
};