package com.codestates.main.post.entity;

import com.codestates.main.auditing.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Getter
public class Post extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long postId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BoardType boardType = BoardType.FREE;

    public void updateTitle(String title) {
        this.title = title;
    }

    public void updateContent(String content) {
        this.content = content;
    }

    public void updateBoardType(BoardType boardType) {
        this.boardType = boardType;
    }
}
