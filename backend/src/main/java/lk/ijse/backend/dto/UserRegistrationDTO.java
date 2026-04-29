package lk.ijse.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lk.ijse.backend.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserRegistrationDTO {
    private Long id;

    @NotEmpty(message = "Name Cannot be empty")
    private String name;

    @NotEmpty(message = "Email Cannot be empty")
    @Email(message = "Invalid email format")
    private String email;

    @Pattern(regexp = "^\\d{10}$", message = "Invalid Phone number")
    private String phone;

    private Date birthday;

    @NotEmpty(message = "NIC Cannot be empty")
    private String nic;

    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;
    private Role role;
}
