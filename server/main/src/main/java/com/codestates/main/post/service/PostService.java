package com.codestates.main.post.service;

import com.codestates.main.exception.BusinessLogicException;
import com.codestates.main.exception.ExceptionCode;
import com.codestates.main.member.service.MemberService;
import com.codestates.main.post.entity.Post;
import com.codestates.main.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

//    private final MemberService memberService;

    public Post createPost(Post post) {
        verifyPost(post);

        return postRepository.save(post);
    }

    private void verifyPost(Post post) {
        // 회원이 존재하는지 확인
        // userService.findVerifiedUser(post.getUser().getUserId());
    }

    public Post updatePost(Post post) {
        Post findPost = findVerifiedPost(post.getPostId());

        Optional.ofNullable(post.getTitle())
                .ifPresent(title -> findPost.updateTitle(title));
        Optional.ofNullable(post.getContent())
                .ifPresent(content -> findPost.updateContent(content));

        return postRepository.save(findPost);
    }

    private Post findVerifiedPost(Long postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        Post findPost = optionalPost.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
        return findPost;
    }

    public Post findPost(Long postId) {
        return findVerifiedPost(postId);
    }

    public Page<Post> findPosts(int page, int size) {
        return postRepository.findAll(PageRequest.of(page,size));
    }

    public void deletePost(Long postId) {
        Post findPost = findVerifiedPost(postId);
        postRepository.delete(findPost);
    }
}