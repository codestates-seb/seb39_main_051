package com.codestates.main.mail.repository;

import com.codestates.main.mail.entity.MailAuth;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MailAuthRepository extends JpaRepository<MailAuth,Long> {
    MailAuth findByEmail(String email);
}
