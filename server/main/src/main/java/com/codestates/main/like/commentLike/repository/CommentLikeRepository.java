package com.codestates.main.like.commentLike.repository;

import com.codestates.main.comment.entity.Comment;
import com.codestates.main.like.commentLike.entity.CommentLike;
import com.codestates.main.like.postlike.entity.PostLike;
import com.codestates.main.member.entity.Member;
import com.codestates.main.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {

    Optional<CommentLike> findByCommentAndMember(Comment comment, Member member);
}
