import React, { useState, useEffect } from "react";
import NoteList from "./NoteList/NoteList";
import LandingPage from "./LandingPage/LandingPage";

import "./HomePage.scss";

import { API } from "aws-amplify";

const HomePage = props => {
  const [newNotes, setNotes] = useState("");

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }

      try {
        const notes = await loadNotes();
        setNotes(notes);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.isAuthenticated]);

  function loadNotes() {
    return API.get("notes", "/notes");
  }

  return <div className="NotesList">{props.isAuthenticated ? <NoteList notes={newNotes} /> : <LandingPage />}</div>;
};

export default HomePage;
