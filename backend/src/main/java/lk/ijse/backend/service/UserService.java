package lk.ijse.backend.service;

import lk.ijse.backend.dto.ResponseDTO;
import lk.ijse.backend.dto.UserRegistrationDTO;
import lk.ijse.backend.entity.Student;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface UserService {
    public int AddUser(UserRegistrationDTO userRegistrationDTO);

    UserDetails loadUserByUsername(String email);

    UserRegistrationDTO loadUserDetailsByUsername(String name);
}
