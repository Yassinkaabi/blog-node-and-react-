import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'
import { message } from 'antd'

const Update = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [updatedBlog, setUpdatedBlog] = useState({});

    useEffect(() => {
        // Fetch the details of the blog post with the specified id and populate the form
        const fetchBlogDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/blog/posts/${id}`);
                setUpdatedBlog(response.data);
            } catch (error) {
                console.error('Error fetching blog details:', error);
            }
        };

        fetchBlogDetails();
    }, [id]);

    const handleChange = (e) => {
        setUpdatedBlog({
            ...updatedBlog,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/blog/posts/${id}`, updatedBlog);
            console.log('blog created:', response.data);
            navigate('/blogs');
        } catch (error) {
            console.error('Error creating blog:', error);
        }
        message.success("Blog updated Successfully!")
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Update Blog</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={updatedBlog.title || ''}
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
                        type="text"
                        name="content"
                        value={updatedBlog.content || ''}
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
                        value={updatedBlog.author || ''}
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
                        value={updatedBlog.slug || ''}
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
                        value={updatedBlog.tags || ''}
                        onChange={handleChange}
                        required
                        placeholder="Enter tags"
                    />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Update
                </Button>
            </Form>
        </div>
    );
};

export default Update;
