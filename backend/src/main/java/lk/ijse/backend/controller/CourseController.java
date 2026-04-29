package lk.ijse.backend.controller;

import jakarta.validation.Valid;
import lk.ijse.backend.dto.CourseDTO;
import lk.ijse.backend.dto.ResponseDTO;
import lk.ijse.backend.dto.StudentDTO;
import lk.ijse.backend.service.CourseService;
import lk.ijse.backend.util.VarList;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/course")
@CrossOrigin
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    @PostMapping("/addCourse")
        public ResponseEntity<ResponseDTO> addCourse(@Valid @RequestBody CourseDTO courseDTO) {
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
    @PutMapping("/updateCourse")
    public ResponseEntity<ResponseDTO> updateCourse(@RequestBody CourseDTO courseDTO) {
        try{
            int response = courseService.updateCourse(courseDTO);

            switch (response) {
                case VarList.Updated -> {
                    return ResponseEntity.status(HttpStatus.CREATED)
                            .body(new ResponseDTO(VarList.Created, "Course Saved", courseDTO));
                }
                case VarList.Not_Found -> {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(new ResponseDTO(VarList.Not_Found, "Course Not found", null));
                }
                default -> {
                    return ResponseEntity.status(HttpStatus.CREATED)
                            .body(new ResponseDTO(VarList.Internal_Server_Error, "Error while updating", null));
                }
            }
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO(VarList.Internal_Server_Error, e.getMessage(), null));
        }
    }

    @GetMapping("/getAllCourses")
    public ResponseEntity<ResponseDTO> getAllCourses() {
        try{
            List<CourseDTO> courses = courseService.getAllCourses();
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDTO(VarList.OK,"success", courses));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO(VarList.Internal_Server_Error, e.getMessage(), null));
        }
    }

    @DeleteMapping("/deleteCourse/{id}")
    public ResponseEntity<ResponseDTO> deleteCourse(@PathVariable Long id) {
        try{
            int response = courseService.deleteCourse(id);
            if(response == VarList.OK){
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new ResponseDTO(VarList.OK, "Course Deleted", null));
            }else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ResponseDTO(VarList.Not_Found, "Course Not Found", null));
            }
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDTO(VarList.Internal_Server_Error, e.getMessage(), null));
        }
    }

}
