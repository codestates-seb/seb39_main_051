package com.codestates.main.answer.dto;

import com.codestates.main.member.entity.Member;
import com.codestates.main.question.entity.Question;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnswerResponseDto {

    private Long answerId;

    private String content;

    private Member member;

    private Question question;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;
}
