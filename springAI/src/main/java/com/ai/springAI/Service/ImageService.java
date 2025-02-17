package com.ai.springAI.Service;
import org.springframework.ai.image.ImagePrompt;
import org.springframework.ai.image.ImageResponse;
import org.springframework.ai.openai.OpenAiImageModel;
import org.springframework.ai.openai.OpenAiImageOptions;
import org.springframework.stereotype.Service;

@Service
public class ImageService {
    private final OpenAiImageModel openAiImageModelmageModel;

    public ImageService(OpenAiImageModel imageModel) {
        this.openAiImageModelmageModel = imageModel;
    }
    //Open Ai docs - https://platform.openai.com/docs/api-reference/images
    public ImageResponse getImage(String prompt) {
        ImageResponse response =openAiImageModelmageModel.call( new ImagePrompt(prompt)) ;
        return response; 
    }


    public ImageResponse getMultipleImages(String prompt, String quality, int n, int width, int height ) {
        ImageResponse response =openAiImageModelmageModel.call( new ImagePrompt(prompt, 
            OpenAiImageOptions.builder()
                .model("dall-e-2")
                .quality(quality)
                .N(n) // number of images to be returned
                .height(height)
                .width(width  ).build())
        );
        return response; 
    }
}
