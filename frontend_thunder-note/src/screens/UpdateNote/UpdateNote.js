import React, { useState, useEffect } from "react";
import MainScreen from "../../components/MainScreen/MainScreen.js"
import { Button, Card, Form } from "react-bootstrap"
import ErrorMessage from "../../components/ErrorMessage"
import Loading from "../../components/Loading"
import { useDispatch, useSelector } from "react-redux"
import { deleteNoteAction, updateNoteAction } from "../../actions/noteActions"
import ReactMarkdown from "react-markdown";
import axios from "axios";

function UpdateNote({ match, history }) {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [category, setCategory] = useState("")
    const [date, setDate] = useState("")

    const dispatch = useDispatch()

    const noteUpdate = useSelector((state) => state.noteUpdate);
    const { loading, error } = noteUpdate;

    const noteDelete = useSelector((state) => state.noteDelete);
    const { loading: loadingDelete, error: errorDelete } = noteDelete;

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure to delete the note")) {
            dispatch(deleteNoteAction(id))
        }
        history.push("/mynotes")
    }


    useEffect(() => {
        const fetching = async () => {
            const { data } = await axios.get(`/api/notes/${match.params.id}`);

            setTitle(data.title);
            setContent(data.content);
            setCategory(data.category);
            setDate(data.updatedAt);
        };

        fetching();
    }, [match.params.id, date]);

    const resetHandler = () => {
        setTitle("");
        setCategory("");
        setContent("");
    };

    const updateHandler = (e) => {
        e.preventDefault();
        dispatch(updateNoteAction(match.params.id, title, content, category));
        if (!title || !content || !category) return;
        resetHandler();
        history.push("/mynotes")
    };

    return (
        <MainScreen title="Edit Note">
            <Card>
                <Card.Header>Edit your Note</Card.Header>
                <Card.Body>
                    <Form onSubmit={updateHandler}>
                        {loadingDelete && <Loading />}

                        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

                        {errorDelete && (
                            <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
                        )}

                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="title"
                                value={title}
                                placeholder="Enter the title"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={content}
                                placeholder="Enter the content"
                                rows={4}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>
                        {content && (
                            <Card>
                                <Card.Header>Note Preview</Card.Header>
                                <Card.Body>
                                    <ReactMarkdown>{content}</ReactMarkdown>
                                </Card.Body>
                            </Card>
                        )}

                        <Form.Group controlId="content">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="content"
                                placeholder="Enter the Category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </Form.Group>
                        {loading && <Loading size={50} />}

                        <Button type="submit" variant="primary">
                            Update Note
                        </Button>

                        <Button
                            className="mx-2"
                            // onClick={deleteHandler(match.params.id)}
                            onClick={() => deleteHandler(match.params.id)}
                            variant="danger">
                            Delete Note
                        </Button>

                    </Form>
                </Card.Body>

                <Card.Footer className="text-muted">
                    Updated on - {date.substring(0, 10)}
                </Card.Footer>
            </Card>
        </MainScreen>
    );
}

export default UpdateNote;