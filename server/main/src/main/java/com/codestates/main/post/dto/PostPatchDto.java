package com.codestates.main.post.dto;

import com.codestates.main.post.entity.BoardType;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class PostPatchDto {

    @Setter
    private Long postId;

    private String title;

    private String content;

//    private BoardType boardType;

//    public String getBoardType() {
//        return boardType.getName();
//    }
}
