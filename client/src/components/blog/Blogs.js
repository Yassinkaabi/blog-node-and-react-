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
            const confirmed = window.confirm('Are you sure you want to delete this post?');
            if (!confirmed) {
                return;
            }
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
                        <li key={blog._id} className="list-group-item" style={{ display: 'flex', justifyContent: 'space-between' }} >
                            <div className='d-flex' style={{ alignItems: 'center', gap: '30px' }}>
                                <strong className="mb-1">{index + 1}</strong>
                                <div>
                                    <p className="mb-1"><span style={{ fontSize: '18px', fontWeight: '600' }}>Title :</span> {blog.title}</p>
                                    <p className="mb-1"><span style={{ fontSize: '18px', fontWeight: '600' }}>Content :</span> {blog.content}</p>
                                    <p className="mb-1"><span style={{ fontSize: '18px', fontWeight: '600' }}>Title :</span> {blog.author}</p>
                                    <p className="mb-1"><span style={{ fontSize: '18px', fontWeight: '600' }}>Slug: </span> {blog.slug}</p>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                        {blog.tags && blog.tags.length > 0 ? (
                                            <>
                                                <p className="mb-2"><span style={{ fontSize: '18px', fontWeight: '600' }}>Tags:</span></p>
                                                <div className="tag-container" style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                                                    {blog.tags.map((tag, tagIndex) => (
                                                        <div variant="outline-primary" className="btn btn-light me-2 mb-2" key={tagIndex}>
                                                            #{tag}
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <p style={{ display: 'none' }}>No tags available</p>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        <Link className='btn btn-success' to={`/posts/update/${blog._id}`}>Update</Link>
                                    </div>
                                </div>
                            </div>
                            {/* Add other blog details as needed */}
                            <div>
                                <button
                                    style={{ fontSize: '10px' }}
                                    className='btn btn-danger'
                                    onClick={() => HandleDelete(blog._id)}
                                >
                                    X
                                </button>
                            </div>
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
                <p style={{ padding: '8px', backgroundColor: '#e9ecef', color: '#222', borderRadius: '4px' }}>Page {pageNumber + 1}</p>
            </div>
        </div >
    )
}

export default Blogs