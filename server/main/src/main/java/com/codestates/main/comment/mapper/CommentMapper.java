package com.codestates.main.comment.mapper;

import com.codestates.main.comment.dto.CommentPatchDto;
import com.codestates.main.comment.dto.CommentPostDto;
import com.codestates.main.comment.dto.CommentResponseDto;
import com.codestates.main.comment.entity.Comment;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    Comment commentPostDtoToComment(CommentPostDto commentPostDto);

    Comment commentPatchDtoToComment(CommentPatchDto commentPatchDto);

    CommentResponseDto commentToCommentResponseDto(Comment comment);

    List<CommentResponseDto> commentsToCommentResponses(List<Comment> comments);
}
