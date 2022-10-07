package com.codestates.main.answer.dto;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnswerPatchDto {

    @Setter
    private Long answerId;
    private String content;
}
