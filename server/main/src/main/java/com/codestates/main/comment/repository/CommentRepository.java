package com.codestates.main.comment.repository;

import com.codestates.main.comment.entity.Comment;
import com.codestates.main.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CommentRepository extends JpaRepository<Comment, Long> {
}
