package com.codestates.main.question.dto;

import com.codestates.main.answer.entity.Answer;
import com.codestates.main.member.dto.MemberDTO;
import com.codestates.main.member.entity.Member;
import com.codestates.main.question.entity.Question;
import com.codestates.main.questionCategory.dto.QuestionCategoryResponseDto;
import com.codestates.main.questionCategory.entity.QuestionCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuestionResponseDto {

    private Long questionId;

    private String content;

    private LocalDateTime createdAt;

    private MemberDTO.Response member;

    private QuestionCategoryResponseDto questionCategory;

    public QuestionResponseDto(Question question) {
        this.questionId = question.getQuestionId();
        this.content = question.getContent();
        this.createdAt = question.getCreatedAt();
        this.member = new MemberDTO.Response(question.getMember());
        this.questionCategory = new QuestionCategoryResponseDto(question.getQuestionCategory());
    }
}
