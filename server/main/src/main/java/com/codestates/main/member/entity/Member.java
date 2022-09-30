package com.codestates.main.member.entity;

import com.codestates.main.like.answerlike.entity.AnswerLike;
import com.codestates.main.like.commentlike.entity.CommentLike;
import com.codestates.main.like.postlike.entity.PostLike;
import com.codestates.main.subscription.entity.Subscription;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
@Entity
@ToString
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private long memberId;

    @Column(nullable = false, length=50, name = "EMAIL")
    private String email;

    @Column(nullable = false, length=50, name = "NICKNAME")
    private String nickname;

    @Column(nullable = false, length=555, name = "PASSWORD")
    private String password;

    @Column(name="PICTURE", nullable = false)
    private String picture;

    @Column(name="CREATED_AT")
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(name="MODIFIED_AT")
    @LastModifiedDate
    private LocalDateTime modifiedAt;


    @Enumerated(value = EnumType.STRING)
    @Column(length=20,nullable = false)
    private ROLE role = ROLE.ROLE_USER;

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public enum ROLE implements GrantedAuthority {
        ROLE_ADMIN("ROLE_ADMIN"),
        ROLE_USER("ROLE_USER");

        @Getter
        private String role;

        @Override
        public String getAuthority() {
            return name();
        }
    }

    public String getUsername(){
        return this.email;
    }
//    public String roles;
//    public List<String> getRoleList() {
//        if(this.roles.length() > 0) {
//            return Arrays.asList(this.roles.split(","));
//        }
//        return new ArrayList<>();
//    }

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<PostLike> postLikes = new ArrayList<>();

    public void setPostLikes(PostLike postLike) {
        this.postLikes.add(postLike);
    }

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<CommentLike> commentLikes = new ArrayList<>();

    public void setCommentLikes(CommentLike commentLike) {
        this.commentLikes.add(commentLike);
    }

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<AnswerLike> answerLikes = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Subscription> subscriptions = new ArrayList<>();
    public void setAnswerLikes(AnswerLike answerLike) {
        this.answerLikes.add(answerLike);
    }

}
