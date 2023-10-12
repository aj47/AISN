import React, { useState } from 'react';
import { useAction } from '@wasp/actions';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getAllPosts from '@wasp/queries/getAllPosts';
import createComment from '@wasp/actions/createComment';

export function Home() {
  const { data: posts, isLoading, error } = useQuery(getAllPosts);
  const createCommentFn = useAction(createComment);
  const [newCommentContent, setNewCommentContent] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateComment = (postId) => {
    createCommentFn({ postId, content: newCommentContent });
    setNewCommentContent('');
  };

  return (
    <div className='p-4'>
      {posts.map((post) => (
        <div
          key={post.id}
          className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>{post.title}</div>
          <img src={post.imageUrl} alt={post.title} />
          <div>{post.user.username}</div>
          <Link
            to={`/post/${post.id}`}
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
          >
            View
          </Link>
        </div>
      ))}
      <Link
        to='/new-post'
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        New post
      </Link>
      {/* <div className='mt-4'>
        <input
          type='text'
          placeholder='New Comment'
          className='px-1 py-2 border rounded text-lg'
          value={newCommentContent}
          onChange={(e) => setNewCommentContent(e.target.value)}
        />
        <button
          onClick={() => handleCreateComment(post.id)}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded mt-2'
        >
          Add Comment
        </button>
      </div> */}
    </div>
  );
}