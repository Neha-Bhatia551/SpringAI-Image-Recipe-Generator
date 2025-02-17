package com.ai.springAI.Service;

import java.util.Map;

import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.stereotype.Service;

@Service 
public class RecipeService {
    private final ChatModel chatModel;

    RecipeService(ChatModel chatModel) {
        this.chatModel = chatModel;
    }

    public String createRecipe(String ingredients, String cusine, String dietRestrictions) {
        var promptTemplate = """
                I want to create a recipe using the following ingredients : {ingredients}.
                The cusine type i prefer is : {cusine}.
                Please consider the following dietary restrictions : {dietRestrictions}.
                Please provide me a detailed recipe including title, list of ingredients and cooking instructions.
                If the ingredients or cusine or dietary restrictions dont make sense, return please provide valid inputs.
                """;
        PromptTemplate template = new PromptTemplate(promptTemplate);
        Map<String, Object> params = Map.of(
            "ingredients", ingredients,
            "cusine",cusine,
            "dietRestrictions", dietRestrictions
        );
        Prompt prompt = template.create(params);
        return chatModel.call(prompt).getResult().getOutput().getText();

    }
}
