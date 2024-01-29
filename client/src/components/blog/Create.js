import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Create = () => {
    const navigate = useNavigate();
    const [newBlog, setNewBlog] = useState({});

    const handleChange = (e) => {
        setNewBlog({
            ...newBlog,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/blog/create', newBlog);
            console.log('New blog created:', response.data);
            navigate('/blogs');
            toast.success('Blog Created Successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            console.error('Error creating blog:', error);
        }
    };

    return (
        <div className="container mt-5">
            {/* Same as */}
            <h1 className="mb-4">Create Blog</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={newBlog.title}
                        onChange={handleChange}
                        required
                        placeholder="Enter title"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formContent">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="content"
                        value={newBlog.content}
                        onChange={handleChange}
                        required
                        placeholder="Enter content"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAuthor">
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                        type="text"
                        name="author"
                        value={newBlog.author}
                        onChange={handleChange}
                        required
                        placeholder="Enter author"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formSlug">
                    <Form.Label>Slug</Form.Label>
                    <Form.Control
                        type="text"
                        name="slug"
                        value={newBlog.slug}
                        onChange={handleChange}
                        required
                        placeholder="Enter slug"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formTags">
                    <Form.Label>Tags</Form.Label>
                    <Form.Control
                        type="text"
                        name="tags"
                        value={newBlog.tags}
                        onChange={handleChange}
                        required
                        placeholder="Enter tags"
                    />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Create Blog
                </Button>
            </Form>
        </div>
    );
};

export default Create;
