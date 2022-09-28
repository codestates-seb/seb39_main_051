package com.codestates.main.comment.entity;

import com.codestates.main.answer.entity.Answer;
import com.codestates.main.auditing.BaseEntity;
import com.codestates.main.like.commentLike.entity.CommentLike;
import com.codestates.main.member.entity.Member;
import com.codestates.main.post.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

    @ManyToOne
    @JoinColumn(name = "ANSWER_ID")
    private Answer answer;

    @OneToMany(mappedBy = "comment", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<CommentLike> commentLikes = new ArrayList<>();
    private long likeCount;

    public void setCommentLikes(CommentLike commentLike) {
        this.commentLikes.add(commentLike);
    }

    public void addPost(Post post) {
        this.post = post;
        if (!this.post.getComments().contains(this)) {
            this.post.getComments().add(this);
        }
    }

    public void addAnswer(Answer answer) {
        this.answer = answer;
        if (!this.answer.getComments().contains(this)) {
            this.answer.getComments().add(this);
        }
    }

    public void addMember(Member member) {
        this.member = member;
    }

    public void updateContent(String content) {
        this.content = content;
    }

    public void discount(CommentLike commentLike) {
        this.commentLikes.remove(commentLike);
    }

    public void updateLikeCount() {
        this.likeCount = (long) this.commentLikes.size();
    }
}
