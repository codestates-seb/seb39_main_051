package com.codestates.main.comment.controller;

import com.codestates.main.comment.dto.CommentPatchDto;
import com.codestates.main.comment.dto.CommentPostDto;
import com.codestates.main.comment.dto.CommentResponseDto;
import com.codestates.main.comment.entity.Comment;
import com.codestates.main.comment.mapper.CommentMapper;
import com.codestates.main.comment.service.CommentService;
import com.codestates.main.dto.SingleResponseDto;
import com.codestates.main.post.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@Validated
public class CommentController {

    private final CommentService commentService;
    private final CommentMapper mapper;

    /*
    * 특정 게시글 댓글 추가
    * */
    @PostMapping("/posts/{post-id}/comments")
    public ResponseEntity postComment(@PathVariable("post-id") Long postId,
                                      @Valid @RequestBody CommentPostDto commentPostDto) {
        System.out.println("CommentController.postComment");

        Comment comment = mapper.commentPostDtoToComment(commentPostDto);
        Comment createdComment = commentService.creatComment(comment, postId, commentPostDto.getMemberId());
        CommentResponseDto commentResponseDto = mapper.commentToCommentResponseDto(createdComment);

        return new ResponseEntity<>(
                new SingleResponseDto<>(commentResponseDto),
                HttpStatus.CREATED);
    }

    /*
    * 댓글 수정
    * */
    @PatchMapping("/posts/{post-id}/comments/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id") Long commentId,
                                       @Valid @RequestBody CommentPatchDto commentPatchDto) {
        commentPatchDto.setCommentId(commentId);
        Comment comment = mapper.commentPatchDtoToComment(commentPatchDto);
        Comment updatedComment = commentService.updateComment(comment);
        CommentResponseDto commentResponseDto = mapper.commentToCommentResponseDto(updatedComment);
        return new ResponseEntity<>(
                new SingleResponseDto<>(commentResponseDto),
                HttpStatus.CREATED);
    }

    /**
     * 댓글 조회
     */
    @GetMapping("/posts/{post-id}/comments/{comment-id}")
    public ResponseEntity getComment(@PathVariable("comment-id") Long commentId) {
        System.out.println("CommentController.getComment");

        Comment findComment = commentService.findComment(commentId);
        CommentResponseDto commentResponseDto = mapper.commentToCommentResponseDto(findComment);

        return new ResponseEntity<>(
                new SingleResponseDto<>(commentResponseDto),
                HttpStatus.CREATED);
    }

/*    @GetMapping("/posts/{post-id}/comments")
    public ResponseEntity getComments(@PathVariable("post-id") Long postId) {
        System.out.println("CommentController.getComments");

        commentService.findCommentsByPost(postId);
//        mapper.commentsToCommentResponses(comments);
        return null;
    }*/
}
