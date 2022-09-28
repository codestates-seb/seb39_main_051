package com.codestates.main.member.repository;

import com.codestates.main.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member,Long> {
    Member findByEmail(String email);
    List<Member> findMembers();
}
