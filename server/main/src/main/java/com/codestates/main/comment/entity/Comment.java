package com.codestates.main.comment.entity;

import com.codestates.main.auditing.BaseEntity;
import com.codestates.main.member.entity.Member;
import com.codestates.main.post.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Comment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @Column(nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "POST_ID")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public void addPost(Post post) {
        this.post = post;
        if (!this.post.getComments().contains(this)) {
            this.post.getComments().add(this);
        }
    }

    public void addMember(Member member) {
        this.member = member;
    }

    public void updateContent(String content) {
        this.content = content;
    }
}
