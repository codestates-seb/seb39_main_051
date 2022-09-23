package com.codestates.main.post.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum BoardType {

    FREE("자유게시판"), SUGGESTION("건의게시판");

    private String name;
}
