package com.codestates.main.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    INVALID_MEMBER_STATUS(400, "Invalid member status"),
    JWT_TOKEN_NOT_FOUND(404,"JWT TOKEN NOT FOUND"),
    POST_NOT_FOUND(404, "Post not found"),
    COMMENT_NOT_FOUND(404, "Comment not found"),
    QUESTION_NOT_FOUND(404, "Question not found"),

    ANSWER_NOT_FOUND(404, "Answer not found");
    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}

