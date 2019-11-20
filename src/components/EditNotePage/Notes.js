import React, { useRef, useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";

const Notes = props => {
  console.log("this is the props in notes", props);
  const file = useRef(null);
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState(0);

  useEffect(() => {
    function loadNote() {
      return API.get("notes", `/notes/${props.match.params.id}`);
    }

    async function onLoad() {
      try {
        const note = await loadNote();
        const { title, content, priority, attachment } = note;

        if (attachment) {
          note.attachmentURL = await Storage.vault.get(attachment);
        }

        setContent(content);
        setNote(note);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  return <div className="Notes"></div>;
};

export default Notes;
