package com.codestates.main.comment.dto;

import com.codestates.main.comment.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentResponseDto {

    private Long commentId;
    private String nickname;

    private String email;

    private Long memberId;
    private String content;

    private int likes = 5;
    private LocalDateTime createdAt;

    public CommentResponseDto(Comment comment) {
        this.commentId = comment.getCommentId();
        this.nickname = comment.getMember().getNickname();
        this.email = comment.getMember().getEmail();
        this.memberId = comment.getMember().getMemberId();
        this.content = comment.getContent();
        this.createdAt = comment.getCreatedAt();
    }
}
