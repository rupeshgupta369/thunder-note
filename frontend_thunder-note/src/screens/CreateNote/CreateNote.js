import React, { useState } from "react";
import MainScreen from "../../components/MainScreen/MainScreen.js"
import { Button, Card, card, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { createNoteAction } from "../../actions/noteActions"
import Loading from "../../components/Loading"
import ErrorMessage from "../../components/ErrorMessage"
import ReactMarkdown from "react-markdown";

function CreateNote({ history }) {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [category, setCategory] = useState("")

    const dispatch = useDispatch()

    const noteCreate = useSelector((state) => state.noteCreate);
    const { loading, error, note } = noteCreate;

    console.log(note);

    const resetHandler = () => {
        setTitle("");
        setCategory("");
        setContent("");
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (!title || !content || !category) return;
        dispatch(createNoteAction(title, content, category));
        resetHandler();
        history.push("/mynotes")
    };

    return (
        <MainScreen title="Create a Note">
            <Card>

                <Card.Header>Create a New Note</Card.Header>

                <Card.Body>
                    <Form onSubmit={submitHandler}>
                        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="title"
                                value={title}
                                placeholder="Enter the title"
                                onChange={e => setTitle(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                type="textarea"
                                value={content}
                                placeholder="Enter the content"
                                rows={4}
                                onChange={e => setContent(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        {content && (<Card>
                            <Card.Header>Note Preview</Card.Header>
                            <Card.Body>
                                <ReactMarkdown>{content}</ReactMarkdown>
                            </Card.Body>
                        </Card>)
                        }

                        <Form.Group controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="category"
                                value={category}
                                placeholder="Enter the category"
                                onChange={e => setCategory(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        {loading && <Loading size={50} />}
                        <Button type="submit" variant="primary">Create Note</Button>
                        <Button className="mx-2" onClick={resetHandler} variant='danger'>Reset Fields</Button>
                    </Form>
                </Card.Body>

                <Card.Footer className="text-muted">
                    Creating on -{new Date().toLocaleDateString()}</Card.Footer>
            </Card>
        </MainScreen>
    )
}

export default CreateNote