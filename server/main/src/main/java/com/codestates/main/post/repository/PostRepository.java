package com.codestates.main.post.repository;

import com.codestates.main.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    Page<Post> findAllByType(Pageable pageable, String type);

    Page<Post> findAllByCategory(Pageable pageable, String category);
}
