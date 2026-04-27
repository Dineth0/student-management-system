package lk.ijse.backend.controller;

import lk.ijse.backend.dto.CourseDTO;
import lk.ijse.backend.dto.ResponseDTO;
import lk.ijse.backend.service.CourseService;
import lk.ijse.backend.util.VarList;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/course")
@CrossOrigin
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @PostMapping("/addCourse")
        public ResponseEntity<ResponseDTO> registerUser(@RequestBody CourseDTO courseDTO) {
            try{
                int response = courseService.addCourse(courseDTO);
                switch (response) {
                    case VarList.Created -> {
                        return ResponseEntity.status(HttpStatus.CREATED)
                                .body(new ResponseDTO(VarList.Created, "Course Created", courseDTO));
                    }
                    case VarList.Conflict -> {
                        return ResponseEntity.status(HttpStatus.CONFLICT)
                                .body(new ResponseDTO(VarList.Conflict, "Course Already exists", null));
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
