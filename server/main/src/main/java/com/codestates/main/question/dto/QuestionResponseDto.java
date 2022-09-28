package com.codestates.main.question.dto;

import com.codestates.main.answer.entity.Answer;
import com.codestates.main.member.entity.Member;
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

    private LocalDateTime modifiedAt;

    private List<Answer> answers;

    private Member member;

//    private QuestionCategory questionCategory;


}
