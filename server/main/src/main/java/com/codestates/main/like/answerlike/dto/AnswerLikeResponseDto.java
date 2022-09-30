package com.codestates.main.like.answerlike.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AnswerLikeResponseDto {

    private long likeCount;

    private Boolean isVoted;

    public AnswerLikeResponseDto(long likeCount, Boolean isVoted) {
        this.likeCount = likeCount;
        this.isVoted = isVoted;
    }
}
