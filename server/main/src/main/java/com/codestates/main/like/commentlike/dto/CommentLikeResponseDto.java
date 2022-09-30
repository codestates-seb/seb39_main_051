package com.codestates.main.like.commentlike.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommentLikeResponseDto {
    private long likeCount;

    private boolean isVoted;

    public CommentLikeResponseDto(long likeCount, boolean isVoted) {
        this.likeCount = likeCount;
        this.isVoted = isVoted;
    }
}
