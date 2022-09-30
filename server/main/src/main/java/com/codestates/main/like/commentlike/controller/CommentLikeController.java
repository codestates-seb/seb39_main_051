package com.codestates.main.like.commentlike.controller;

import com.codestates.main.comment.dto.CommentResponseDto;
import com.codestates.main.comment.service.CommentService;
import com.codestates.main.like.commentlike.dto.CommentLikePostDto;
import com.codestates.main.like.commentlike.dto.CommentLikeResponseDto;
import com.codestates.main.like.commentlike.service.CommentLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class CommentLikeController {

    private final CommentLikeService commentLikeService;
    private final CommentService commentService;

    @PostMapping("/comments/{comment-id}/like")
    public ResponseEntity commentLikeComment(@PathVariable("comment-id") Long commentId,
                                       @RequestBody CommentLikePostDto commentLikePostDto) {
        boolean isVoted;
        isVoted = commentLikeService.commentLike(commentId, commentLikePostDto.getMemberId());
        long likeCount = commentService.findComment(commentId).getLikeCount();
        CommentLikeResponseDto commentLikeResponseDto = new CommentLikeResponseDto(likeCount, isVoted);
        return new ResponseEntity(commentLikeResponseDto, HttpStatus.OK);
    }
}
