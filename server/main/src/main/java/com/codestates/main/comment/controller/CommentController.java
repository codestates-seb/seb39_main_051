package com.codestates.main.comment.controller;

import com.codestates.main.answer.service.AnswerService;
import com.codestates.main.comment.dto.CommentPatchDto;
import com.codestates.main.comment.dto.CommentPostDto;
import com.codestates.main.comment.dto.CommentResponseDto;
import com.codestates.main.comment.entity.Comment;
import com.codestates.main.comment.mapper.CommentMapper;
import com.codestates.main.comment.service.CommentService;
import com.codestates.main.dto.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Slf4j
@RequiredArgsConstructor
@Validated
public class CommentController {

    private final CommentService commentService;
    private final CommentMapper mapper;
    private final AnswerService answerService;

    /*
    * 자유/건의 Post에 댓글 추가
    * */
    @PostMapping("/posts/{post-id}/comments")
    public ResponseEntity postPostComment(@PathVariable("post-id") Long postId,
                                      @Valid @RequestBody CommentPostDto commentPostDto) {
        System.out.println("CommentController.postComment");

        Comment comment = mapper.commentPostDtoToComment(commentPostDto);
        Comment createdComment = commentService.creatComment(comment, postId);
        CommentResponseDto commentResponseDto = new CommentResponseDto(createdComment);

        return new ResponseEntity<>(commentResponseDto, HttpStatus.CREATED);
    }

    /*
    * 답변에 댓글 추가
    * */
    @PostMapping("/answers/{answer-id}/comments")
    public ResponseEntity postAnswerComment(@PathVariable("answer-id") Long answerId,
                                      @RequestBody CommentPostDto commentPostDto) {
        Comment comment = mapper.commentPostDtoToComment(commentPostDto);
        Comment creatComment = commentService.creatAnswerComment(comment, answerId);
        CommentResponseDto commentResponseDto = new CommentResponseDto(creatComment);
        return new ResponseEntity<>(commentResponseDto, HttpStatus.CREATED);
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
        CommentResponseDto commentResponseDto = new CommentResponseDto(updatedComment);
        return new ResponseEntity<>(commentResponseDto, HttpStatus.OK);
    }

    /*
     * 댓글 수정
     * */
    @PatchMapping("/answers/{answer-id}/comments/{comment-id}")
    public ResponseEntity patchAnswerComment(@PathVariable("comment-id") Long commentId,
                                       @Valid @RequestBody CommentPatchDto commentPatchDto) {
        commentPatchDto.setCommentId(commentId);
        Comment comment = mapper.commentPatchDtoToComment(commentPatchDto);
        Comment updatedComment = commentService.updateComment(comment);
        CommentResponseDto commentResponseDto = new CommentResponseDto(updatedComment);
        return new ResponseEntity<>(commentResponseDto, HttpStatus.OK);
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

    @DeleteMapping("/comments/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment-id") Long commentId) {
        commentService.deleteComment(commentId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
