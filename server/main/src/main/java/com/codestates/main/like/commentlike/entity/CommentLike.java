package com.codestates.main.like.commentlike.entity;

import com.codestates.main.comment.entity.Comment;
import com.codestates.main.member.entity.Member;
import lombok.*;

import javax.persistence.*;
import java.util.Optional;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class CommentLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentLikeId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "POST_ID")
    private Comment comment;

    public void setMember(Member member) {
        this.member = member;
        member.setCommentLikes(this);
    }

    public void setComment(Comment comment) {
        this.comment = comment;
        comment.setCommentLikes(this);
    }

    public static boolean isVotedComment(Optional<CommentLike> optionalCommentLike) {
        return optionalCommentLike.isPresent();
    }
}
