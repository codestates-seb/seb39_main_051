package com.codestates.main.question.dto;

import com.codestates.main.answer.dto.AnswerResponseDto;
import com.codestates.main.answer.dto.AnswerResponseDto2;
import com.codestates.main.answer.entity.Answer;
import com.codestates.main.member.entity.Member;
import com.codestates.main.question.entity.Question;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionResponseDto2 {

    private Long questionId;
    private String content;

    private Long memberId;

    private String email;

    private String nickname;

    private Long questionCategoryId;

    private String questionCategoryName;
    private LocalDateTime createdAt;

    private List<AnswerResponseDto2> answers;

    public QuestionResponseDto2(Question question) {
        this.questionId = question.getQuestionId();
        this.memberId =question.getMember().getMemberId();
        this.email = question.getMember().getEmail();
        this.nickname = question.getMember().getNickname();
        this.content = question.getContent();
        this.questionCategoryId = question.getQuestionCategory().getQuestionCategoryId();
        this.questionCategoryName = question.getQuestionCategory().getName();
        this.createdAt = question.getCreatedAt();
        this.answers = question.getAnswers().
                stream()
                .map(answer -> new AnswerResponseDto2(answer)).
                collect(Collectors.toList());
    }
}
