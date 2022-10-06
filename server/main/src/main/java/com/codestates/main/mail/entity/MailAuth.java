package com.codestates.main.mail.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class MailAuth {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private long mailAuthId;

    @Column
    private String email;

    @Column
    private String certificationNumber;

    @Column
    @CreatedDate
    private LocalDateTime sendAt;

    @Column
    private Authed authed = Authed.UNCERTIFIED;

    public enum Authed{
        UNCERTIFIED,
        CERTIFIED
    }
}
