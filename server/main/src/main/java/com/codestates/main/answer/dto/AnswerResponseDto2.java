package com.codestates.main.answer.dto;

import com.codestates.main.answer.entity.Answer;
가import com.codestates.main.comment.dto.CommentResponseDto;
import com.codestates.main.comment.dto.CommentResponseDto;
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
public class AnswerResponseDto2 {
    private Long answerId;
    private String content;

    private String email;
    private Long memberId;
    private String nickname;

    private LocalDateTime createdAt;

    private List<CommentResponseDto> comments;

    public AnswerResponseDto2(Answer answer) {
        this.answerId = answer.getAnswerId();
        this.email = answer.getMember().getEmail();
        this.memberId = answer.getMember().getMemberId();
        this.content = answer.getContent();
        this.nickname = answer.getMember().getNickname();
        this.createdAt = answer.getCreatedAt();
        this.comments = answer.getComments()
                .stream()
                .map(comment -> new CommentResponseDto(comment))
                .collect(Collectors.toList());
    }
}
