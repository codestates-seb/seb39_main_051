package com.codestates.main.like.commentlike.controller;

import com.codestates.main.like.commentlike.dto.CommentLikePostDto;
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

    @PostMapping("/comments/{comment-id}/like")
    public ResponseEntity commentLikeComment(@PathVariable("comment-id") Long commentId,
                                       @RequestBody CommentLikePostDto commentLikeCommentDto) {

        commentLikeService.commentLike(commentId, commentLikeCommentDto.getMemberId());
        return new ResponseEntity(HttpStatus.OK);
    }
}
