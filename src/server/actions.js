import HttpError from '@wasp/core/HttpError.js'

export const createPost = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Post.create({
    data: {
      title: args.title,
      content: args.content,
      user: { connect: { id: context.user.id } }
    }
  })
}

export const editPost = async ({ id, title, content }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const post = await context.entities.Post.findUnique({
    where: { id }
  });
  if (post.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Post.update({
    where: { id },
    data: { title, content }
  });
}

export const createComment = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const comment = await context.entities.Comment.create({
    data: {
      content: args.content,
      postId: args.postId,
      userId: context.user.id
    }
  });

  return comment;
}