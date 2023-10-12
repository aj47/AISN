import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getPost from '@wasp/queries/getPost';
import createComment from '@wasp/actions/createComment';

export function ViewPost() {
  const { postId } = useParams();
  const { data: post, isLoading, error } = useQuery(getPost, { postId });
  const createCommentFn = useAction(createComment);
  const [newCommentContent, setNewCommentContent] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateComment = () => {
    createCommentFn({ content: newCommentContent, postId: post.id });
    setNewCommentContent('');
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-2'>{post.title}</h1>
      {/* <p className='text-gray-500 mb-4'>Author: {post.user.username}</p> */}
      <img src={post.imageUrl} alt={post.title} />
      <p>{post.content}</p>

      <div className='mt-8'>
        <h2 className='text-xl font-bold mb-4'>Comments</h2>
        {post.comments.map((comment) => (
          <div key={comment.id} className='bg-gray-100 p-2 mb-2'>
            <p>{comment.content}</p>
            {/* <p className='text-gray-500'>By: {comment.user.username}</p> */}
          </div>
        ))}
      </div>

      <div className='mt-8'>
        <h2 className='text-xl font-bold mb-4'>Add Comment</h2>
        <textarea
          className='border border-gray-300 p-2 mb-2'
          value={newCommentContent}
          onChange={(e) => setNewCommentContent(e.target.value)}
        ></textarea>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={handleCreateComment}
        >
          Add Comment
        </button>
      </div>
    </div>
  );
}