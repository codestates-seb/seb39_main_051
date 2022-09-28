package com.codestates.main.post.dto;

import com.codestates.main.comment.dto.CommentResponseDto;
import com.codestates.main.post.entity.Post;
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
public class PostResponseDto2 {
    private Long postId;

    private String title;

    private String content;
    private String category;

    private String nickname;

    private Long memberId;

    private String email;

    private long likeCount;
    private LocalDateTime createdAt;

    private List<CommentResponseDto> comments;

    public PostResponseDto2(Post post) {
        this.postId = post.getPostId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.category = post.getCategory();
        this.nickname = post.getMember().getNickname();
        this.memberId = post.getMember().getMemberId();
        this.email = post.getMember().getEmail();
        this.likeCount = post.getLikeCount();
        this.createdAt = post.getCreatedAt();
        this.comments = post.getComments()
                .stream()
                .map(comment -> new CommentResponseDto(comment))
                .collect(Collectors.toList());
    }
}
