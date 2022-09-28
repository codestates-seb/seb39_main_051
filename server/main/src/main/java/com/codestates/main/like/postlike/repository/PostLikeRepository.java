package com.codestates.main.like.postlike.repository;


import com.codestates.main.like.postlike.entity.PostLike;
import com.codestates.main.member.entity.Member;
import com.codestates.main.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {

    Optional<PostLike> findByPostAndMember(Post post, Member member);
}
