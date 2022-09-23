package com.codestates.main.post.dto;

import com.codestates.main.post.entity.BoardType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostPostDto {

//    private Long postId;

    private String title;

    private String content;

//    private BoardType boardType;

//    public String getBoardType() {
//        return boardType.getName();
//    }
}
