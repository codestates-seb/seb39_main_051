package com.codestates.main.post.controller;

import com.codestates.main.dto.MultiResponseDto;
import com.codestates.main.dto.SingleResponseDto;
import com.codestates.main.post.dto.PostPatchDto;
import com.codestates.main.post.dto.PostPostDto;
import com.codestates.main.post.dto.PostResponseDto;
import com.codestates.main.post.entity.Post;
import com.codestates.main.post.mapper.PostMapper;
import com.codestates.main.post.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@Slf4j
@RequestMapping("/posts")
@RequiredArgsConstructor
@Validated
public class PostController {

    private final PostService postService;
    private final PostMapper mapper;

    @PostMapping
    public ResponseEntity postPost(@Valid @RequestBody PostPostDto postPostDto) {
        System.out.println("PostController.postPost");

        Post post = mapper.postPostDtoToPost(postPostDto);
        Post createdPost = postService.createPost(post);
        PostResponseDto postResponseDto = mapper.postToPostResponseDto(createdPost);

        return new ResponseEntity(
                new SingleResponseDto<>(postResponseDto), HttpStatus.CREATED);
    }

    @PatchMapping("/{post-id}")
    public ResponseEntity patchPost(@PathVariable("post-id") Long postId,
                                    @Valid @RequestBody PostPatchDto postPatchDto) {
        System.out.println("PostController.patchPost");

        postPatchDto.setPostId(postId);
        Post post = mapper.postPatchDtoToPost(postPatchDto);
        Post updatedPost = postService.updatePost(post);
        PostResponseDto postResponseDto = mapper.postToPostResponseDto(updatedPost);

        return new ResponseEntity<>(
                new SingleResponseDto<>(postResponseDto), HttpStatus.OK);
    }

    @GetMapping("/{post-id}")
    public ResponseEntity getPost(@PathVariable("post-id") Long postId) {
        System.out.println("PostController.getPost");

        Post findPost = postService.findPost(postId);
        PostResponseDto postResponseDto = mapper.postToPostResponseDto(findPost);

        return new ResponseEntity<>(
                new SingleResponseDto<>(postResponseDto), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getPosts(@RequestParam int page,
                                   @RequestParam int size,
                                   @RequestParam Optional<String> type,
                                   @RequestParam Optional<String> category) {
        System.out.println("PostController.getPosts");
        Page<Post> pagePosts;
        if (type.isPresent()) {
            pagePosts = postService.findPostsByType(page - 1, size, type.get());
        }
        else {
            pagePosts = postService.findPostsByCategory(page - 1, size, category.get());
        }
        List<Post> posts = pagePosts.getContent();
        List<PostResponseDto> postResponseDtos = mapper.postsToPostResponses(posts);


        return new ResponseEntity<>(
                new MultiResponseDto<>(postResponseDtos, pagePosts), HttpStatus.OK
        );
    }

    @DeleteMapping("/{post-id}")
    public ResponseEntity deletePost(@PathVariable("post-id") Long postId) {
        postService.deletePost(postId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
