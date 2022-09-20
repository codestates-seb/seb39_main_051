package com.codestates.main.member.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "MEMBER")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private long memberId;

    @Column(nullable = false, length=50, name = "EMAIL")
    private String email;

    @Column(nullable = false, length=50, name = "NICKNAME")
    private String nickname;

    @Column(nullable = false, length=50, name = "PASSWORD")
    private String password;

    @Column(name="PICTURE")
    private String picture;

    @Column(nullable = false, name="CREATED_AT")
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(name="MODIFIED_AT")
    @LastModifiedDate
    private LocalDateTime modifiedAt;

    @Enumerated(value = EnumType.STRING)
    @Column(length=20,nullable = false)
    private ROLE role = ROLE.MEMBER_GENERAL;

    public enum ROLE{
        MEMBER_ADMIN("관리자"),
        MEMBER_GENERAL("일반유저");

        @Getter
        private String role;

        ROLE(String role){this.role=role;}
    }

}
