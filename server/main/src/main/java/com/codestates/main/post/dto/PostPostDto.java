package com.codestates.main.post.dto;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
public class PostPostDto {

    private String title;

    private String content;

    private String type;

    private String category;

    private Long memberId;
}
