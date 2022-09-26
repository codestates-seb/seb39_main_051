package com.codestates.main.question.mapper;

import com.codestates.main.question.dto.QuestionPatchDto;
import com.codestates.main.question.dto.QuestionPostDto;
import com.codestates.main.question.dto.QuestionResponseDto;
import com.codestates.main.question.entity.Question;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface QuestionMapper {

//    Question questionPostDtoToQuestion(QuestionPostDto questionPostDto);
//
//    Question questionPatchDtoToQuestion(QuestionPatchDto questionPatchDto);
//
//    QuestionResponseDto questionToQuestionResponseDto(Question question);
}
