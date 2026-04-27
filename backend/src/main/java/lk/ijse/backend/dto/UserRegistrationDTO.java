package lk.ijse.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserRegistrationDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private Date birthday;
    private String nic;
    private Long course_id;
    private String password;
}
