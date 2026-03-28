import React from "react";
import EntryItem from "../components/EntryItem";

export default function Teaching() {
  return (
    <>
      <h2 className="title">Teaching</h2>

      <p className="section-text section-text--lg">
        Courses I teach, as a TA.
      </p>

      <EntryItem
        title="CS 4375: Introduction to Machine Learning"
        description="host office hours, design exam questions and deliver review lectures for the course."
        time="fall 2024"
        role="teaching assistant"
      />

      <EntryItem
        title="CS 4375: Introduction to Machine Learning"
        description="host office hours; teach introductory level of machine learning compilation, triton programming; design coding assignments/exam questions."
        time="fall 2025"
        role="teaching assistant"
        links={[
          { href: 'https://github.com/tingxi-li/portfolio/releases/download/v1.0/ml-compilation-triton.pdf', label: 'Download Slides' },
        ]}
      />
    </>
  );
}
