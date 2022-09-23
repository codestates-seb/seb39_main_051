package com.codestates.main.post.dto;

import com.codestates.main.post.entity.BoardType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostResponseDto {
    private Long postId;

    private String title;

    private String content;
//    private BoardType boardType;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

/*    public String getBoardType() {
        return boardType.getName();
    }*/
}
