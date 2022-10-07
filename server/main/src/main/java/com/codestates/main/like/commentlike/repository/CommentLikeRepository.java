package com.codestates.main.like.commentlike.repository;

import com.codestates.main.comment.entity.Comment;
import com.codestates.main.like.commentlike.entity.CommentLike;
import com.codestates.main.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {

    Optional<CommentLike> findByCommentAndMember(Comment comment, Member member);
}
