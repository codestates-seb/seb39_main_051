package com.codestates.main.like.commentLike.controller;

import com.codestates.main.like.commentLike.dto.CommentLikePostDto;
import com.codestates.main.like.commentLike.service.CommentLikeService;
import com.codestates.main.like.postlike.dto.PostLikePostDto;
import com.codestates.main.like.postlike.service.PostLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class commentLikeController {

    private final CommentLikeService commentLikeService;

    @PostMapping("/comments/{comment-id}/like")
    public ResponseEntity commentLikeComment(@PathVariable("comment-id") Long commentId,
                                       @RequestBody CommentLikePostDto commentLikeCommentDto) {

        commentLikeService.commentLike(commentId, commentLikeCommentDto.getMemberId());
        return new ResponseEntity(HttpStatus.OK);
    }
}
