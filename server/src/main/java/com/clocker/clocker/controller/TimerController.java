package com.clocker.clocker.controller;

import com.clocker.clocker.payload.*;
import com.clocker.clocker.model.Timer;
import com.clocker.clocker.model.User;
import com.clocker.clocker.security.CurrentUser;
import com.clocker.clocker.security.UserPrincipal;
import com.clocker.clocker.service.TimerService;
import com.clocker.clocker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/api/timer")
public class TimerController {

    @Autowired
    private TimerService timerService;

    @Autowired
    private UserService userService;

    @PostMapping("/add")
    public ResponseEntity<?> addTimer(@CurrentUser UserPrincipal currentUser) {
        User user = userService.getUserByUsername(currentUser.getUsername());
        if (timerService.addTimer(user)) {
            return new ResponseEntity<>(new TimerCreateResponse(true, "Timer create success!", new Date()),
                    HttpStatus.OK);
        }
        return new ResponseEntity<>(new ApiResponse(false, "Unexpected error occurred"),
                HttpStatus.NOT_FOUND);
    }

    @GetMapping("/timers/{page}")
    public UserTimers getUserTimers(@CurrentUser UserPrincipal currentUser, @PathVariable(value = "page") Integer page) {
        User user = userService.getUserByUsername(currentUser.getUsername());

        UserTimers userTimers = new UserTimers(user.getTimers(page));

        return userTimers;
    }

    @GetMapping("/timers/pages")
    public ResponseEntity<?> getUserTimers(@CurrentUser UserPrincipal currentUser) {
        User user = userService.getUserByUsername(currentUser.getUsername());
        Integer numberOfPages = user.getNumberOfPages();

        return new ResponseEntity<>(String.valueOf(numberOfPages),
                HttpStatus.OK);
    }

    @PostMapping("/setCategory/{timerId}")
    public ResponseEntity<?> setTimerCategory(@CurrentUser UserPrincipal currentUser, @PathVariable(value = "timerId") Long timerId, @RequestBody TimerCategoryUpdateRequest timerCategoryUpdateRequest) {
        if (timerService.updateTimerCategory(currentUser, timerId, timerCategoryUpdateRequest)) {
            return new ResponseEntity<>(new ApiResponse(true, "Timer update success!"),
                    HttpStatus.OK);
        }
        return new ResponseEntity<>(new ApiResponse(false, "Timer is not belongs to current user"),
                HttpStatus.BAD_REQUEST);

    }

    @PostMapping("/setTitle/{timerId}")
    public ResponseEntity<?> updateTitleTimer(@CurrentUser UserPrincipal currentUser, @PathVariable(value = "timerId") Long timerId, @RequestBody TimerUpdateRequest timerUpdateRequest) {
        if (timerService.updateTitleTimer(currentUser, timerId, timerUpdateRequest)) {
            return new ResponseEntity<>(new ApiResponse(true, "Timer update success!"),
                    HttpStatus.OK);
        }
        return new ResponseEntity<>(new ApiResponse(false, "Timer is not belongs to current user"),
                HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/stop/{timerId}")
    public ResponseEntity<?> stopTimer(@CurrentUser UserPrincipal currentUser, @PathVariable(value = "timerId") Long timerId) {
        if (timerService.stopTimer(currentUser, timerId)) {
            return new ResponseEntity<>(new ApiResponse(true, "Timer stop success!"),
                    HttpStatus.OK);
        }
        return new ResponseEntity<>(new ApiResponse(false, "Timer is not belongs to current user"),
                HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/resume/{timerId}")
    public ResponseEntity<?> resumeTimer(@CurrentUser UserPrincipal currentUser, @PathVariable(value = "timerId") Long timerId) {
        if (timerService.resumeTimer(currentUser, timerId)) {
            return new ResponseEntity<>(new ApiResponse(true, "Timer resume success!"),
                    HttpStatus.OK);
        }
        return new ResponseEntity<>(new ApiResponse(false, "Timer is not belongs to current user"),
                HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/timer/{timerId}")
    public TimerResponse timerData(@CurrentUser UserPrincipal currentUser, @PathVariable(value = "timerId") Long timerId) {
        Timer timer = timerService.getTimerById(timerId);
        TimerResponse timerResponse = new TimerResponse(timer.getId(), timer.getStartAt(), timer.getEndAt(), timer.getTitle());
        if (timer.getCategory() != null) {
            timerResponse.setCategory(timer.getCategory().getTitle());
            timerResponse.setCategoryId(String.valueOf(timer.getCategory().getId()));
        }

        return timerResponse;
    }

    @PostMapping("/update/time/{timerId}")
    public ResponseEntity<?> timerUpdateTime(@CurrentUser UserPrincipal currentUser, @PathVariable(value = "timerId") Long timerId, @RequestBody TimerUpdateEndTimeRequest timerUpdateEndTimeRequest) {
        if (timerService.timerUpdateTime(currentUser, timerId, timerUpdateEndTimeRequest)) {
            return new ResponseEntity<>(new ApiResponse(true, "Timer update success!"),
                    HttpStatus.OK);
        }
        return new ResponseEntity<>(new ApiResponse(false, "Error occurred"),
                HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/stopAll")
    public ResponseEntity<?> stopAll(@CurrentUser UserPrincipal currentUser) {
        if (timerService.stopAll(currentUser)) {
            return new ResponseEntity<>(new ApiResponse(true, "All timers stopped successfully!"),
                    HttpStatus.OK);
        }
        return new ResponseEntity<>(new ApiResponse(false, "Error occurred"),
                HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/delete/{timerId}")
    public ResponseEntity<?> deleteTimer(@CurrentUser UserPrincipal currentUser, @PathVariable(value = "timerId") Long timerId) {
        if (timerService.deleteTimer(currentUser, timerId)) {
            return new ResponseEntity<>(new ApiResponse(true, "Timer delete success!"),
                    HttpStatus.OK);
        }
        return new ResponseEntity<>(new ApiResponse(false, "Error occurred"),
                HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/delete/all")
    public ResponseEntity<?> deleteTimer(@CurrentUser UserPrincipal currentUser) {
        if (timerService.deleteTimer(currentUser)) {
            return new ResponseEntity<>(new ApiResponse(true, "Timer delete success!"),
                    HttpStatus.OK);
        }
        return new ResponseEntity<>(new ApiResponse(false, "Error occurred"),
                HttpStatus.BAD_REQUEST);
    }
}
