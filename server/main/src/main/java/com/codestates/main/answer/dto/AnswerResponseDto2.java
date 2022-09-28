package com.codestates.main.answer.dto;

import com.codestates.main.answer.entity.Answer;
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
public class AnswerResponseDto2 {
    private String content;

    private String answerWriter;

    private LocalDateTime createdAt;

    public AnswerResponseDto2(Answer answer) {
        this.content = answer.getContent();
        this.answerWriter = answer.getMember().getNickname();
        this.createdAt = answer.getCreatedAt();
    }
}
