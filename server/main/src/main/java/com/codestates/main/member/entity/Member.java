package com.codestates.main.member.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
@Entity
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

    @Column(name="PICTURE", columnDefinition = "BLOB")
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

    public enum ROLE implements GrantedAuthority {
        MEMBER_ADMIN("관리자"),
        MEMBER_GENERAL("일반유저");

        @Getter
        private String role;


        ROLE(String role){
            this.role=role;
        }

        @Override
        public String getAuthority() {
            return name();
        }
    }
//    public String roles;
//    public List<String> getRoleList() {
//        if(this.roles.length() > 0) {
//            return Arrays.asList(this.roles.split(","));
//        }
//        return new ArrayList<>();
//    }
}
