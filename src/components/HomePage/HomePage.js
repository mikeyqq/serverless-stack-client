import React, { useState, useEffect } from "react";
import NoteList from "./NoteList/NoteList";
import LandingPage from "./LandingPage/LandingPage";

import "./HomePage.scss";

import { API } from "aws-amplify";

const HomePage = props => {
  console.log("this is the props in homepage", props);

  const [newNotes, setNotes] = useState("");
  // const [isLoading, setIsLoading] = useState(true);
  console.log("this is the newnotes in homepage", newNotes);

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

      // setIsLoading(false);
    }

    onLoad();
  }, [props.isAuthenticated]);

  function loadNotes() {
    return API.get("notes", "/notes");
  }

  return <div className="NotesList">{props.isAuthenticated ? <NoteList notes={newNotes} /> : <LandingPage />}</div>;
};

export default HomePage;

//import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
//import { LinkContainer } from "react-router-bootstrap";
//const HomePage = props => {
//   const [notes, setNotes] = useState([""]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     async function onLoad() {
//       if (!props.isAuthenticted) {
//         return;
//       }

//       try {
//         const notes = await loadNotes();
//         setNotes(notes);
//         console.log("yours note in homepage after doing API get", notes);
//         setIsLoading(false);
//       } catch (e) {
//         alert(e);
//       }
//       setIsLoading(false);
//     }

//     onLoad();
//   }, []);

//   //Function to retrieve notes from AWS
//   function loadNotes() {
//     return API.get("notes", "/notes");
//   }

//   function renderLander() {
//     return (
//       <div className="lander">
//         <h1>Pocketlist</h1>
//         <p>
//           A simple note taking app anywhere, <br /> anytime at the palm of your hands
//         </p>
//       </div>
//     );
//   }

//   function renderNotesList(notes) {
//     return <div>{console.log("here are your notessssss", notes)}</div>;
//   }

//   function renderNotes() {
//     return (
//       <div className="notes">
//         <PageHeader>Your Notes</PageHeader>
//         <ListGroup>{!props.isLoading && renderNotesList(notes)}</ListGroup>
//       </div>
//     );
//   }

//   return <div className="Home">{props.isAuthenticated ? renderNotes() : renderLander()}</div>;
// };
// export default HomePage;
