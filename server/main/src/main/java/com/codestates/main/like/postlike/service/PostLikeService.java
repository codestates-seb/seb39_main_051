package com.codestates.main.like.postlike.service;

import com.codestates.main.like.postlike.entity.PostLike;
import com.codestates.main.like.postlike.repository.PostLikeRepository;
import com.codestates.main.member.entity.Member;
import com.codestates.main.member.service.MemberService;
import com.codestates.main.post.entity.Post;
import com.codestates.main.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class PostLikeService {

    private final PostLikeRepository postLikeRepository;
    private final MemberService memberService;
    private final PostService postService;
    public void postLike(Long postId, Long memberId) {
        Post findPost = postService.findPost(postId);
        Member findMember = memberService.findVerifiedMember(memberId);
        Optional<PostLike> optionalPostLike = postLikeRepository.findByPostAndMember(findPost, findMember);

        optionalPostLike.ifPresentOrElse(
                postLike -> {   // 만약 좋아요를 누른 상태라면
                    postLikeRepository.delete(postLike);
                    findPost.discountLike(postLike);
                    findPost.updateLikeCount();
                },
                () -> { // 좋아요를 누르지 않은 상태라면
                    PostLike postLike = PostLike.builder().build();

                    postLike.setPost(findPost);
                    postLike.setMember(findMember);
                    findPost.updateLikeCount();

                    postLikeRepository.save(postLike);
                }
        );
    }

}
