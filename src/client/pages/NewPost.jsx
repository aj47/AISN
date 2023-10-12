import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAction } from '@wasp/actions';
import createPost from '@wasp/actions/createPost';

export function NewPostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const createPostFn = useAction(createPost);

  const handleCreatePost = () => {
    createPostFn({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>New Post</h1>
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Title'
          className='px-2 py-1 border rounded'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className='mb-4'>
        <textarea
          placeholder='Content'
          className='px-2 py-1 border rounded'
          rows='5'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <button
        onClick={handleCreatePost}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Create Post
      </button>
      <Link to='/' className='ml-4 text-blue-500'>Cancel</Link>
    </div>
  );
}