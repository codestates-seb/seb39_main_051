package com.codestates.main.like.postlike.controller;

import com.codestates.main.like.postlike.dto.PostLikePostDto;
import com.codestates.main.like.postlike.dto.PostLikeResponseDto;
import com.codestates.main.like.postlike.service.PostLikeService;
import com.codestates.main.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PostLikeController {

    private final PostLikeService postLikeService;
    private final PostService postService;
    @PostMapping("/posts/{post-id}/like")
    public ResponseEntity postLikePost(@PathVariable("post-id") Long postId,
                                       @RequestBody PostLikePostDto postLikePostDto) {
        boolean isVoted;
        isVoted = postLikeService.postLike(postId, postLikePostDto.getMemberId());
        long likeCount = postService.findPost(postId).getLikeCount();
        PostLikeResponseDto postLikeResponse = new PostLikeResponseDto(likeCount, isVoted);
        return new ResponseEntity(postLikeResponse, HttpStatus.OK);
    }
}
