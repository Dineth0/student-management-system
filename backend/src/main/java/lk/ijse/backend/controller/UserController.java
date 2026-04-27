package lk.ijse.backend.controller;

import lk.ijse.backend.dto.ResponseDTO;
import lk.ijse.backend.dto.UserRegistrationDTO;
import lk.ijse.backend.service.UserService;
import lk.ijse.backend.util.VarList;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<ResponseDTO> registerUser(@RequestBody UserRegistrationDTO userRegistrationDTO) {
        try{
            int response = userService.AddUser(userRegistrationDTO);
            switch (response) {
                case VarList.Created -> {
                    return ResponseEntity.status(HttpStatus.CREATED)
                            .body(new ResponseDTO(VarList.Created, "User Created", userRegistrationDTO));
                }
                case VarList.Conflict -> {
                    return ResponseEntity.status(HttpStatus.CONFLICT)
                            .body(new ResponseDTO(VarList.Conflict, "User Already exists", null));
                }
                default -> {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body(new ResponseDTO(VarList.Internal_Server_Error, "Error While Saving", null));
                }
            }
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO(VarList.Internal_Server_Error, e.getMessage(), null));
        }

    }
}
