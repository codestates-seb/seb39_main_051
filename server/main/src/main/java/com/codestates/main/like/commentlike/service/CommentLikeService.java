package com.codestates.main.like.commentlike.service;

import com.codestates.main.comment.entity.Comment;
import com.codestates.main.comment.service.CommentService;
import com.codestates.main.like.commentlike.entity.CommentLike;
import com.codestates.main.like.commentlike.repository.CommentLikeRepository;
import com.codestates.main.member.entity.Member;
import com.codestates.main.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentLikeService {

    private final CommentLikeRepository commentLikeRepository;
    private final CommentService commentService;
    private final MemberService memberService;
    public boolean commentLike(Long commentId, Long memberId) {
        Comment findComment = commentService.findComment(commentId);
        Member findMember = memberService.findVerifiedMember(memberId);
        Optional<CommentLike> optionalCommentLike = commentLikeRepository.findByCommentAndMember(findComment, findMember);

        optionalCommentLike.ifPresentOrElse(
                commentLike -> {
                    commentLikeRepository.delete(commentLike);
                    findComment.discount(commentLike);
                    findComment.updateLikeCount();
                },

                () -> {
                    CommentLike commentLike = CommentLike.builder().build();

                    commentLike.setComment(findComment);
                    commentLike.setMember(findMember);
                    findComment.updateLikeCount();

                    commentLikeRepository.save(commentLike);
                }
        );

        if (optionalCommentLike.isPresent())
            return false;
        else
            return true;

    }
}
