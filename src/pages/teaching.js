import React from "react";
import "../global.css";
import BackHome from "../components/BackHome";
import EntryItem from "../components/EntryItem";
export default function Teaching() {
  return (
    <main>
      <BackHome />
      <p className="title" style={{ fontSize: "var(--title-font-size)" }}>Teaching</p>
      <p className="content" style={{fontFamily: "var(--font-mono)", fontSize: "var(--text-font-size)" , fontWeight: 400}}>
        Courses I teach, as a TA.
        <br />
        <br />
      </p>

      <EntryItem
      title="CS 4375: Introduction to Machine Learning"
      description="host office hours, design exam questions and deliver review lectures for the course."
      time="fall 2024"
      role="teaching assistant"
      />
      
      <br />

      <EntryItem
      title="CS 4375: Introduction to Machine Learning"
      description="host office hours; teach introductory level of machine learning compilation, vllm, sglang, tilelang and triton; design coding assignments."
      time="fall 2025"
      role="teaching assistant"
      />
      <br />
      <br />
      <br />
    </main>
  );
}
