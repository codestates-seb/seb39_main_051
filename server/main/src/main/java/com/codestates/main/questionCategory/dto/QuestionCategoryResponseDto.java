package com.codestates.main.questionCategory.dto;

import com.codestates.main.questionCategory.entity.QuestionCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionCategoryResponseDto {

    private Long questionCategoryId;

    private String name;

    public QuestionCategoryResponseDto(QuestionCategory questionCategory) {
        this.questionCategoryId = questionCategory.getQuestionCategoryId();
        this.name = questionCategory.getName();
    }
}
