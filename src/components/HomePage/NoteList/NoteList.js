import React from "react";
import NoteListItem from "./NoteListItem/NoteListItem";

import { ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function NoteList(props) {
  console.log("props inside notelist", props);
  return [{}].concat(props.notes).map((note, i) =>
    i !== 0 ? (
      <NoteListItem note={note} />
    ) : (
      <div>
        <h3> Your Notes </h3>
        <LinkContainer key="new" to="/notes/create">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create a new note
            </h4>
          </ListGroupItem>
        </LinkContainer>
      </div>
    )
  );
}
