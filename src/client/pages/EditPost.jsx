import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getPost from '@wasp/queries/getPost';
import editPost from '@wasp/actions/editPost';

export function EditPost() {
  const { postId } = useParams();
  const { data: post, isLoading, error } = useQuery(getPost, { postId });
  const editPostFn = useAction(editPost);
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [imageUrl, setImageUrl] = useState(post?.imageUrl || ''); // Added imageUrl state

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleEditPost = () => {
    editPostFn({ id: postId, title, content, imageUrl }); // Added imageUrl to editPostFn
  };

  return (
    <div className='p-4'>
      <input
        type='text'
        placeholder='Title'
        className='px-1 py-2 border rounded text-lg'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type='text'
        placeholder='Image URL' // Added placeholder for Image URL
        className='px-1 py-2 border rounded text-lg'
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <textarea
        placeholder='Content'
        className='px-1 py-2 border rounded text-lg'
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button
        onClick={handleEditPost}
        className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
      >
        Save
      </button>
      <Link to={`/post/${postId}`} className='bg-red-500 hover:bg-red-700 px-2 py-2 text-white font-bold rounded ml-2'>
        Cancel
      </Link>
    </div>
  );
}