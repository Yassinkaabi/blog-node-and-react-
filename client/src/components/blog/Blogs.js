import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/blog/posts');
                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const HandleDelete = async (id) => {
        try {
            // Send DELETE request
            await axios.delete(`http://localhost:5000/api/blog/posts/${id}`);

            // Fetch updated data after deletion
            const response = await axios.get('http://localhost:5000/api/blog/posts');

            // Check if the response data is an array
            if (Array.isArray(response.data)) {
                // Update the state with the new data
                setBlogs(response.data);
                toast.success('Blog deleted successfully');
            } else {
                console.error('Invalid response data after deletion:', response.data);
                toast.error('Error updating blog list');
            }
        } catch (error) {
            console.error('Error deleting data:', error);
            toast.error('Error deleting blog');
        }
    }

    // Pagination
    const [pageNumber, setPageNumber] = useState(0);
    const productsPerPage = 6; // Nombre de produits par page
    const pagesVisited = pageNumber * productsPerPage;
    const pageCount = Math.ceil(blogs.length / productsPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div className="container mt-5 mb-5">
            <div className='d-flex' style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <h1 className="mb-4">Blog List</h1>
                <Link className='btn btn-primary mb-4' to='/blog/create'>Create post</Link>
            </div>
            <ul className="list-group">
                {blogs
                    .slice(pagesVisited, pagesVisited + productsPerPage)
                        .map((blog, index) => (
                            <li key={blog._id} className="list-group-item">
                                <div className='d-flex' style={{ alignItems: 'center', gap: '30px' }}>
                                    <strong className="mb-1">{index + 1}</strong>
                                    <div>
                                        <h3 className="mb-2">{blog.title}</h3>
                                        <p className="mb-1">{blog.content}</p>
                                        <p className="text-muted">Author: {blog.author}</p>
                                        <div style={{ display: 'flex', gap: '4px' }}>
                                            <Link className='btn btn-success' to={`/posts/update/${blog._id}`}>Update</Link>
                                            <button className='btn btn-danger' onClick={() => HandleDelete(blog._id)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* Add other blog details as needed */}
                            </li>
                        ))}
            </ul>
            <div style={{ marginTop: '20px', paddingBottom: '10px', display: 'flex', justifyContent: 'center' }}>
                {/* Pagination component */}
                <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', marginRight: '10px' }}>
                    <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={'pagination'}
                        previousLinkClassName={'previous'}
                        nextLinkClassName={'next'}
                        disabledClassName={'disabled'}
                        activeClassName={'active'}
                    />
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <p style={{ padding: '8px', backgroundColor: '#e9ecef', color: '#222' }}>Page {pageNumber + 1}</p>
            </div>
        </div>
    )
}

export default Blogs