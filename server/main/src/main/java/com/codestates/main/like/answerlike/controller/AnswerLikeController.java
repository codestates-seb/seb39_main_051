package com.codestates.main.like.answerlike.controller;

import com.codestates.main.like.answerlike.dto.AnswerLikePostDto;
import com.codestates.main.like.answerlike.service.AnswerLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AnswerLikeController {

    private final AnswerLikeService answerLikeService;

    @PostMapping("/answers/{answer-id}/like")
    public ResponseEntity answerLikePost(@PathVariable("answer-id") Long answerId,
                                         @RequestBody AnswerLikePostDto answerLikePostDto) {
        answerLikeService.postLike(answerId, answerLikePostDto.getMemberId());
        return new ResponseEntity(HttpStatus.CREATED);
    }
}
