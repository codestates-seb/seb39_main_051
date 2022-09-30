package com.codestates.main.like.postlike.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostLikeResponseDto {

    private long likeCount;

    private Boolean isVoted;

    public PostLikeResponseDto(long likeCount, boolean isVoted) {
        this.likeCount = likeCount;
        this.isVoted = isVoted;
    }
}
