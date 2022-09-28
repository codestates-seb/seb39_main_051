package com.codestates.main.answer.mapper;

import com.codestates.main.answer.dto.AnswerPatchDto;
import com.codestates.main.answer.dto.AnswerPostDto;
import com.codestates.main.answer.dto.AnswerResponseDto;
import com.codestates.main.answer.entity.Answer;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AnswerMapper {

    Answer answerPostDtoToAnswer(AnswerPostDto answerPostDto);

    Answer answerPatchDtoToAnswer(AnswerPatchDto answerPatchDto);
    AnswerResponseDto answerToAnswerResponseDto(Answer answer);
}
