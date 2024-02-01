import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { message } from 'antd'

const Create = () => {
    const navigate = useNavigate();
    const [newBlog, setNewBlog] = useState({
        tags: [],
        currentTag: '',
        filteredTags: [],
    });

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

    const handleTagInput = (e) => {
        if (e.key === ' ' && newBlog.currentTag.trim() !== '') {
            if (!newBlog.tags.includes(newBlog.currentTag.trim())) {
                setNewBlog({
                    ...newBlog,
                    tags: [...newBlog.tags, newBlog.currentTag.trim()],
                    currentTag: '', // Reset current tag after adding it
                });
            } else {
                setNewBlog({
                    ...newBlog,
                    currentTag: '',
                });
                message.error('Tag already exists');
            }
        }
    };

    const handleTagDelete = (tagToDelete) => {
        setNewBlog({
            ...newBlog,
            tags: newBlog.tags.filter(tag => tag !== tagToDelete),
        });
    };

    return (
        <div className="container mt-5">
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
                    <div>
                        {newBlog.tags.map((tag, index) => (
                            <Button key={index} variant="outline-primary" className="me-2 mb-2" onClick={() => handleTagDelete(tag)}>
                                {tag}
                            </Button>
                        ))}
                    </div>
                    <Form.Control
                        type="text"
                        name="currentTag"
                        value={newBlog.currentTag}
                        onChange={handleChange}
                        onKeyDown={handleTagInput}
                        placeholder="Enter tags and press Space"
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
