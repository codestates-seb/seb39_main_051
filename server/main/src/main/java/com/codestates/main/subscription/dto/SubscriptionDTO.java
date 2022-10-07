package com.codestates.main.subscription.dto;

import com.codestates.main.questionCategory.entity.QuestionCategory;
import com.codestates.main.subscription.entity.Subscription;
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

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response{
        private long questionCategoryId;
        private String name;
        public Response(Subscription subscription){
            this.questionCategoryId=subscription.getQuestionCategory().getQuestionCategoryId();
            this.name=subscription.getQuestionCategory().getName();
        }
    }


}
