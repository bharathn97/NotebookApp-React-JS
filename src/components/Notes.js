import React, { useContext, useEffect, useRef, useState } from 'react';
import {useNavigate} from "react-router";
import NoteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = (props) => {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  const [loading, setLoading] = useState(true);
  let history=useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token'))
    {
    getNotes().then(() => {
      setLoading(false);
    });
  }
  else
  {
   history("/login")
  }
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({ id: '', etitle: '', edescription: '', etag: '' });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
    props.showAlert('Updated successfully', 'success');
  };

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert('Updated successfully', 'success');
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={note.etitle.length < 5 || note.edescription.length < 5}
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="container mx-2">
          {loading ? 'Loading...' : notes.length === 0 ? 'No notes to display' : null}
        </div>
        {Array.isArray(notes) && notes.length > 0
          ? notes.map((note) => (
              <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
            ))
          : null}
      </div>
    </>
  );
};

export default Notes;
