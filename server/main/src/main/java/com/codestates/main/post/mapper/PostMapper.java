package com.codestates.main.post.mapper;

import com.codestates.main.post.dto.PostPatchDto;
import com.codestates.main.post.dto.PostResponseDto;
import com.codestates.main.post.dto.PostPostDto;
import com.codestates.main.post.entity.Post;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PostMapper {

   Post postPostDtoToPost(PostPostDto postPostDto);


    Post postPatchDtoToPost(PostPatchDto postPatchDto);

    PostResponseDto postToPostResponseDto(Post post);

    List<PostResponseDto> postsToPostResponses(List<Post> posts);


}
