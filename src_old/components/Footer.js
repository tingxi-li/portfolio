import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const FooterBox = styled((props) => (
    <Box component="footer" {...props} />
))(({ theme }) => ({
    position: "absolute",
    bottom: theme.spacing(1),
    left: theme.spacing(3),
    backgroundColor: "transparent",
    fontSize: "1.1rem",
}));


// Define StyledLink with explicit hover styles
const StyledLink = styled("a")(() => ({
    textDecoration: "none", // Remove underline by default
    color: "white", // Default link color
    transition: "color 0.3s ease, text-decoration 0.3s ease", // Add smooth transition for hover effects
    "&:hover": {
      color: "orange", // Change color on hover
      textDecoration: "underline", // Add underline on hover
    },
  }));
  

export default function Footer(props) {
return (
    <FooterBox>
    © Designed by{" "}
    <StyledLink
        href="https://iamhuang.run/" // Replace with your link
        target="_blank"
        rel="noopener noreferrer"
    >
        Run Huang
    </StyledLink>
    .
    </FooterBox>
);
}