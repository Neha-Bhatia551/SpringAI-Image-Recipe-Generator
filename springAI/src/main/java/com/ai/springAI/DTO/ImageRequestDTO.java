package com.ai.springAI.DTO;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImageRequestDTO {

    @NotBlank(message = "Prompt cannot be empty.")
    @Size(max = 1000, message = "Prompt must be less than 1000 characters.")
    private String prompt;

    @Min(value = 1, message = "n must be at least 1.")
    @Max(value = 4, message = "n must be at most 4.")
    private int n=1;

    @Pattern(regexp = "256|512|1024", message = "Width must be one of 256, 512, or 1024.")
    private String width="512";  // Store as String to match the allowed values

    @Pattern(regexp = "256|512|1024", message = "Height must be one of 256, 512, or 1024.")
    private String height="512";

    private String quality = "hd";  // Default value
   
}

