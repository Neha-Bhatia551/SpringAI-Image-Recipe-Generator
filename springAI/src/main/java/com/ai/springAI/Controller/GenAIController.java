package com.ai.springAI.Controller;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.ai.image.ImageResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ai.springAI.DTO.ImageRequestDTO;
import com.ai.springAI.Service.ChatService;
import com.ai.springAI.Service.ImageService;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController 
public class GenAIController {
    
    ChatService chatService;

    ImageService imageService;

    public GenAIController(ChatService chatService, ImageService imageService) {
        this.chatService = chatService;
        this.imageService = imageService; 
    }

    @GetMapping("queryAI")
    public String getResponse(@RequestParam String prompt) {
        return chatService.getResponseFromAI(prompt);  
    }

    @GetMapping("queryAIOptions")
    public String getResponseWithOptions(@RequestParam String prompt) {
        return chatService.getResponseFromAIWithOptions(prompt);  
    }
      
    //we are redirecting to the image here, the image url is valid for 60 minutes
    @GetMapping("generate-images")
    public void getImageResponse(HttpServletResponse response,  @RequestParam String prompt) throws IOException {
        ImageResponse res= imageService.getImage(prompt);  
        String imageUrl = res.getResult().getOutput().getUrl();
        response.sendRedirect(imageUrl);
    }

    @GetMapping("generate-images-with-options")
    public List<String> getImageResponseWithOptions(@RequestParam String prompt,
        @RequestParam (defaultValue =  "hd") String quality,
        @RequestParam ( defaultValue =  "1") int n,
        @RequestParam ( defaultValue =  "1024") int width,
        @RequestParam ( defaultValue =  "1024") int height )  throws IOException {
        ImageResponse res= imageService.getMultipleImages(prompt, quality, n , width, height);  
        //using streams to get all urls from  ImageResponse
        List<String> imageUrls = res.getResults().stream()
            .map(result -> result.getOutput().getUrl())
            .collect(Collectors.toList());
        return imageUrls;
    }

    @GetMapping("generate-images-with-options2")
    public List<String> getImageResponseWithOptions2(@Valid @ModelAttribute ImageRequestDTO request)  throws IOException {
        ImageResponse res= imageService.getMultipleImages(request.getPrompt(), request.getQuality(),request.getN(),
            Integer.valueOf(request.getWidth()), Integer.valueOf(request.getHeight()));  

        //using streams to get all urls from  ImageResponse
        List<String> imageUrls = res.getResults().stream() 
            .map(result -> result.getOutput().getUrl())
            .collect(Collectors.toList());
        return imageUrls;
    }
}
