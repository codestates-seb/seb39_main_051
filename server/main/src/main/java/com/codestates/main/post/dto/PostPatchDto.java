package com.codestates.main.post.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class PostPatchDto {
    @Setter
    private Long postId;

    private String content;

    private String category;
}
