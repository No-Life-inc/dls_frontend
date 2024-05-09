import React, { useState } from 'react';
import { updateComment } from '../api/apiFunctions';
import { Comment } from '../types/types';


interface EditCommentProps {
  comment: Comment;
  token: string;
}

const EditComment: React.FC<EditCommentProps> = ({ comment, token }) => {
  const [bodyText, setBodyText] = useState(comment.commentInfo?.bodyText || '');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await updateComment(comment.commentGuid, {commentInfo: {bodyText: bodyText}} , token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Comment Text:
        <textarea
          value={bodyText}
          onChange={(e) => setBodyText(e.target.value)}
        />
      </label>
      <button type="submit">Update Comment</button>
    </form>
  );
};

export default EditComment;
