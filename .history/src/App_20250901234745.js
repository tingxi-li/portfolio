// /src/App.js
import NavBar from "./nav/navbar";
import Bio from "./home/bio";
export default function App() {
  return (
    <div className="glow">
      <NavBar />
      <Bio
        imageSrc="https://via.placeholder.com/100"
        text="Hello, I'm a software developer."
      />
    </div>
  );
}