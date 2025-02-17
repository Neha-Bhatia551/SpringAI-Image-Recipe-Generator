package com.ai.springAI.Service;

import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.stereotype.Service;

@Service
public class ChatService {
    private final ChatModel chatModel   ;

    ChatService(ChatModel chatModel) {
        this.chatModel = chatModel;
     
    }
    
    public String getResponseFromAI(String prompt) {
        return   chatModel.call(prompt);
    }

    public String getResponseFromAIWithOptions(String prompt) {
        ChatResponse res =  chatModel.call(new Prompt(
            prompt,
            OpenAiChatOptions.builder()
                .model("gpt-4o")
                .temperature(0.4)
                .maxCompletionTokens(100)
            .build()
        ));
        return res.getResult().getOutput().getText();  
    }

}
