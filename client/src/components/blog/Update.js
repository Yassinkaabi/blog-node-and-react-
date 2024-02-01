import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'
import { message } from 'antd'

const Update = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [updatedBlog, setUpdatedBlog] = useState({
        tags: [],
        currentTag: '',
        filteredTags: [],
    });

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

    const handleChange = (e) => {
        setUpdatedBlog({
            ...updatedBlog,
            [e.target.name]: e.target.value,
        });
    };

    const handleTagInput = (e) => {
        if (e.key === ' ' && updatedBlog.currentTag.trim() !== '') {
            if (!updatedBlog.tags.includes(updatedBlog.currentTag.trim())) {
                setUpdatedBlog({
                    ...updatedBlog,
                    tags: [...updatedBlog.tags, updatedBlog.currentTag.trim()],
                    currentTag: '', // Reset current tag after adding it
                });
            } else {
                setUpdatedBlog({
                    ...updatedBlog,
                    currentTag: '',
                });
                message.error('Tag already exists');
            }
        }
    };

    const handleTagDelete = (tagToDelete) => {
        setUpdatedBlog({
            ...updatedBlog,
            tags: updatedBlog.tags.filter(tag => tag !== tagToDelete),
        });
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
                    <div>
                        {updatedBlog.tags.map((tag, index) => (
                            <Button key={index} variant="outline-primary" className="me-2 mb-2" onClick={() => handleTagDelete(tag)}>
                                {tag}
                            </Button>
                        ))}
                    </div>
                    <Form.Control
                        type="text"
                        name="currentTag"
                        value={updatedBlog.currentTag}
                        onChange={handleChange}
                        onKeyDown={handleTagInput}
                        placeholder="Enter tags and press Space"
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
