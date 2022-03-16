import React, { useEffect } from 'react';
import { Accordion, Badge, Button, Card } from 'react-bootstrap';
import MainScreen from '../../components/MainScreen/MainScreen';
import { Link, useHistory } from "react-router-dom";
// import ReactMarkdown from "react-markdown";

// import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { deleteNoteAction, listNotes } from '../../actions/noteActions';
import Loading from "../../components/Loading"
import ErrorMessage from "../../components/ErrorMessage"

const MyNotes = ({ search }) => {
    const dispatch = useDispatch();
    const noteList = useSelector(state => state.noteList)
    const { loading, notes, error } = noteList;
    // console.log(noteList);
    /* This is destructuring the noteList state from the store. */
    /* 
    removed
    // const [notes, setNotes] = useState([]);
    */

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;

    const noteCreate = useSelector((state) => state.noteCreate);
    const { success: successCreate } = noteCreate;

    const noteUpdate = useSelector((state) => state.noteUpdate);
    const { success: successUpdate } = noteUpdate;

    const noteDelete = useSelector(state => state.noteDelete);
    const { loading: loadingDelete,
        error: errorDelete,
        success: successDelete
    } = noteDelete;

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteNoteAction(id));
        }
    }

    //   
    /*removed 
       const fetchNotes = async () => {
            const { data } = await axios.get("/api/notes");
            // console.log(data);
            setNotes(data)
        }
     */
    // console.log(notes);

    const history = useHistory();
    useEffect(() => {
        /* // rremoved
        fetchNotes();
         */
        dispatch(listNotes())
        if (!userInfo) {
            history.push('/')
        }
    }, [dispatch, successCreate, history, userInfo, successUpdate, successDelete]);

    return (
        <MainScreen title={`Welcome ${userInfo.name}`} >
            <Link to="createnote">
                <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
                    Create New Note
                </Button>
            </Link>
            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            {errorDelete && (
                <ErrorMessage variant='danger'>{errorDelete}</ErrorMessage>
            )}
            {loading && <Loading />}
            {loadingDelete && <Loading />}
            {
                notes
                    ?.reverse()
                    .filter((filteredNote) => {
                        return filteredNote.title
                            .toLowerCase()
                            .includes(search.toLowerCase())
                    })
                    .map(note => (
                        <Accordion key={note._id}>
                            <Card style={{ margin: 10 }} key={note._id}>
                                <Card.Header style={{ display: "flex" }}>
                                    <span
                                        // onClick={() => ModelShow(note)}
                                        style={{
                                            color: "black",
                                            textDecoration: "none",
                                            flex: 1,
                                            cursor: "pointer",
                                            alignSelf: "center",
                                            fontSize: 18,
                                        }}
                                    >
                                        <Accordion.Toggle
                                            as={Card.Text}
                                            variant="link"
                                            eventKey="0"
                                        >
                                            {note.title}
                                        </Accordion.Toggle>
                                    </span>

                                    <div>
                                        <Button href={`/note/${note._id}`}>Edit</Button>
                                        <Button
                                            variant="danger"
                                            className="mx-2"
                                            onClick={() => deleteHandler(note._id)}
                                        >
                                            Delete
                                        </Button>

                                    </div>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <h4>
                                            <Badge variant="success">
                                                Category - {note.category}
                                            </Badge>
                                        </h4>
                                        <blockquote className="blockquote mb-0">
                                            <p>{note.content}</p>
                                            <footer className="blockquote-footer">
                                                Created on date{" "}
                                                <cite title='Source Title'>
                                                    {note.createdAt.substring(0, 10)}
                                                </cite>
                                            </footer>
                                        </blockquote>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    ))
            }
            {/* here title is title and MyNotes is children */}
        </MainScreen>
    );
};
export default MyNotes;
