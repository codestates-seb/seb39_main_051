package com.codestates.main.question.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionPostDto {

    private String content;
    private Long memberId;
    private Long questionCategoryId;
}
