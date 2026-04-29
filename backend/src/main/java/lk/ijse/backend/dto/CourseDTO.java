package lk.ijse.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CourseDTO {
    private Long id;

    @NotBlank(message = "Name Cannot be empty")
    private String name;

    @NotBlank(message = "Course Code Cannot be empty")
    private String course_code;

    @NotBlank(message = "Description Cannot be empty")
    private String description;

    @NotBlank(message = "Duration Cannot be empty")
    private String duration;

    @Positive(message = "Fee must be a positive value")
    @NotNull(message = "Fee is required")
    private double fee;
}
