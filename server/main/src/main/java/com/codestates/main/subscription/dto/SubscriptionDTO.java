package com.codestates.main.subscription.dto;

import com.codestates.main.questionCategory.entity.QuestionCategory;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class SubscriptionDTO {
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post{
        private long questionCategoryId;
    }
}
