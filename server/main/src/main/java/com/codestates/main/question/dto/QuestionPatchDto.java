package com.codestates.main.question.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class QuestionPatchDto {

    @Setter
    private Long questionId;
    private String content;
}
