package com.codestates.main.post.dto;

import com.codestates.main.comment.entity.Comment;
import com.codestates.main.post.entity.Post;
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
public class PostResponseDto {
    private Long postId;

    private String title;

    private String category;

    private String nickname;

    private String email;

    private Long memberId;

    private LocalDateTime createdAt;

    public PostResponseDto(Post post) {
        this.postId = post.getPostId();
        this.title = post.getTitle();
        this.category = post.getCategory();
        this.nickname = post.getMember().getNickname();
        this.email = post.getMember().getEmail();
        this.memberId = post.getMember().getMemberId();
        this.createdAt = post.getCreatedAt();
    }
}
