package com.codestates.main.question.mapper;

import com.codestates.main.question.dto.QuestionPatchDto;
import com.codestates.main.question.dto.QuestionPostDto;
import com.codestates.main.question.dto.QuestionResponseDto;
import com.codestates.main.question.entity.Question;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface QuestionMapper {

    default Question  questionPostDtoToQuestion(QuestionPostDto questionPostDto) {
        return Question.builder()
                .content(questionPostDto.getContent())
                .build();
    }

    Question questionPatchDtoToQuestion(QuestionPatchDto questionPatchDto);

    QuestionResponseDto questionToQuestionResponseDto(Question question);

    List<QuestionResponseDto> questionsToQuestionResponses(List<Question> questions);
}
