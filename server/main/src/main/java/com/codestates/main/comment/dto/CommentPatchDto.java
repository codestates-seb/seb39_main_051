package com.codestates.main.comment.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class CommentPatchDto {

    @Setter
    private Long commentId;
    private String content;
}
