package com.codestates.main.post.repository;

import com.codestates.main.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
    Page<Post> findAllByType(Pageable pageable, String type);

    Page<Post> findAllByCategory(Pageable pageable, String category);

    Page<Post> findAllByTypeAndTitleContaining(Pageable pageable, String type, String keyword);

    Page<Post> findAllByCategoryAndTitleContaining(Pageable pageable, String category, String keyword);
}
