package com.codestates.main.like.answerlike.controller;

import com.codestates.main.answer.service.AnswerService;
import com.codestates.main.like.answerlike.dto.AnswerLikeResponseDto;
import com.codestates.main.like.answerlike.service.AnswerLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AnswerLikeController {

    private final AnswerLikeService answerLikeService;
    private final AnswerService answerService;

    @PostMapping("/answers/{answer-id}/like")
    public ResponseEntity answerLikePost(@PathVariable("answer-id") Long answerId) {
        boolean isVoted;
        isVoted = answerLikeService.postLike(answerId);
        long likeCount = answerService.findAnswer(answerId).getLikeCount();
        AnswerLikeResponseDto answerLikeResponseDto = new AnswerLikeResponseDto(likeCount, isVoted);
        return new ResponseEntity(answerLikeResponseDto, HttpStatus.CREATED);
    }
}
