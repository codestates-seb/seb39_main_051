package com.codestates.main.comment.dto;

import com.codestates.main.member.entity.Member;
import com.codestates.main.post.entity.Post;
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
    private String content;
//    private Post post;
//    private Member member;
//    private LocalDateTime createdAt;
//    private LocalDateTime modifiedAt;
}
