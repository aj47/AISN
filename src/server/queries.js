import HttpError from '@wasp/core/HttpError.js'

export const getAllPosts = async (args, context) => {
  const posts = await context.entities.Post.findMany({
    include: { user: true }
  });

  return posts;
}

export const getPost = async ({ postId }, context) => {
  const post = await context.entities.Post.findUnique({
    where: { id: parseInt(postId) },
    include: { user: true, comments: true }
  });

  if (!post) throw new HttpError(404, `No post with id ${postId}`);

  return post;
}
