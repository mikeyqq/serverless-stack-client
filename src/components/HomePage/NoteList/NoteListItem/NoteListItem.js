import React from "react";

import { ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const NoteListItems = props => {
  return (
    <LinkContainer key={props.note.noteId} to={`/notes/${props.note.noteId}`}>
      <ListGroupItem header={props.note.title}>
        {"Created: " + new Date(props.note.createdAt).toLocaleString()}
      </ListGroupItem>
    </LinkContainer>
  );
};

export default NoteListItems;
