package com.codestates.main.post.entity;

import com.codestates.main.auditing.BaseEntity;
import com.codestates.main.comment.entity.Comment;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

    private String type;

    private String category;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "post")
    @JsonIgnore
    private List<Comment> comments = new ArrayList<>();

    public void addComments(Comment comment) {
        this.comments.add(comment);
        if (comment.getPost() != this){
            comment.addPost(this);
        }
    }

    public void updateTitle(String title) {
        this.title = title;
    }

    public void updateContent(String content) {
        this.content = content;
    }

    public void updateCategory(String category) {
        this.category = category;
    }
}
