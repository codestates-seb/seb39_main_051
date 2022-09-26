package com.codestates.main.comment.dto;

import com.codestates.main.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentPostDto {
    private Long memberId;
    private String content;
}
