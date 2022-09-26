package com.codestates.main.answer.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long answerId;

    @AllArgsConstructor
    @NoArgsConstructor
    public enum BoardType{
        FREE_BOARD("고민상담,취업정보,유머,잡담 등,기타"),
        BOARD("질문 추가 요청/ 질문 수정 요청/ 기타");
        private String category;
    }
}
