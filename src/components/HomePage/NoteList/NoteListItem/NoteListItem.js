import React from "react";

import { ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const NoteListItems = ({ note }) => {
  console.log("your notes from notelist item", note);
  return (
    <LinkContainer key={note.noteId} to={`/notes/${note.noteId}`}>
      <ListGroupItem header={note.title}>{"Created: " + new Date(note.createdAt).toLocaleString()}</ListGroupItem>
    </LinkContainer>
  );
};

export default NoteListItems;
