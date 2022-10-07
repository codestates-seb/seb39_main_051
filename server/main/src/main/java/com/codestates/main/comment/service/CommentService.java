package com.codestates.main.comment.service;

import com.codestates.main.answer.entity.Answer;
import com.codestates.main.answer.repository.AnswerRepository;
import com.codestates.main.comment.entity.Comment;
import com.codestates.main.comment.repository.CommentRepository;
import com.codestates.main.config.SecurityUtils;
import com.codestates.main.exception.BusinessLogicException;
import com.codestates.main.exception.ExceptionCode;
import com.codestates.main.member.entity.Member;
import com.codestates.main.member.repository.MemberRepository;
import com.codestates.main.member.service.MemberService;
import com.codestates.main.post.entity.Post;
import com.codestates.main.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentService {

    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;
    private final PostRepository postRepository;
    private final AnswerRepository answerRepository;
    private final MemberService memberService;

    public Comment creatComment(Comment comment, Long postId) {
        System.out.println("CommentService.creatComment");
        Member findMember = SecurityUtils.getCurrentMember(memberService);
//        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Optional<Post> optionalPost = postRepository.findById(postId);
//        Member findMember = optionalMember.orElseThrow(() ->
//                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Post findPost = optionalPost.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
        comment.addMember(findMember);
        comment.addPost(findPost);
        return commentRepository.save(comment);
    }

    public Comment creatAnswerComment(Comment comment, Long answerId) {
        System.out.println("CommentService.creatAnswerComment");
        Member findMember = SecurityUtils.getCurrentMember(memberService);
//        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
//        Member findMember = optionalMember.orElseThrow(() ->
//                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Answer findAnswer = optionalAnswer.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
        comment.addMember(findMember);
        comment.addAnswer(findAnswer);
        return commentRepository.save(comment);
    }

    public Comment updateComment(Comment comment) {
        System.out.println("CommentService.updateComment");

        Comment findComment = findVerifiedComment(comment.getCommentId());
        Optional.ofNullable(comment.getContent())
                .ifPresent(content -> findComment.updateContent(content));

        return commentRepository.save(findComment);
    }

    public Comment findVerifiedComment(Long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        Comment findComment = optionalComment.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        return findComment;
    }


    public Comment findComment(Long commentId) {
        return findVerifiedComment(commentId);
    }

   /* public Page<Comment> findCommentsByPost(Long postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        Post findPost = optionalPost.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
        return commentRepository.findByPost(findPost);
    }*/
    public void deleteComment(Long commentId) {
        Comment findComment = findVerifiedComment(commentId);
        commentRepository.delete(findComment);
    }
}
