package com.clocker.controller;

import com.clocker.exception.ResourceNotFoundException;
import com.clocker.model.Timer;
import com.clocker.model.User;
import com.clocker.payload.*;
import com.clocker.repository.TimerRepository;
import com.clocker.repository.UserRepository;
import com.clocker.security.CurrentUser;
import com.clocker.security.UserPrincipal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Set;

@RestController
@RequestMapping("/api/timer")
public class TimerController {

    @Autowired
    private TimerRepository timerRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @PostMapping("/add")
    public ResponseEntity<?> addTimer(@CurrentUser UserPrincipal currentUser) {
        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", currentUser.getUsername()));


        user.endPreviousTimers();
        // Create timer
        Timer timer = new Timer();
        timerRepository.save(timer);

        //Add timer to current user
        Set<Timer> userTimers = user.getTimers();
        userTimers.add(timer);
        user.setTimers(userTimers);
        userRepository.save(user);

        return new ResponseEntity(new TimerCreateResponse(true, "Timer create success!", new Date()),
                HttpStatus.OK);
    }

    @GetMapping("/timers")
    public UserTimers getUserTimers(@CurrentUser UserPrincipal currentUser) {
        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", currentUser.getUsername()));

        UserTimers userTimers = new UserTimers(user.getTimers());

        return userTimers;
    }

    @PostMapping("/setTitle/{timerId}")
    public ResponseEntity<?> updateTitleTimer(@CurrentUser UserPrincipal currentUser, @PathVariable(value = "timerId") Long timerId, @RequestBody TimerUpdateRequest timerUpdateRequest) {
        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", currentUser.getUsername()));

        Timer timer = timerRepository.findById(timerId)
                .orElseThrow(() -> new ResourceNotFoundException("Timer", "id", timerId));
        timer.setTitle(timerUpdateRequest.getTitle());
        timerRepository.save(timer);


        return new ResponseEntity(new ApiResponse(true, "Timer update success!"),
                HttpStatus.OK);
    }

    @PostMapping("/stop/{timerId}")
    public ResponseEntity<?> stopTimer(@CurrentUser UserPrincipal currentUser, @PathVariable(value = "timerId") Long timerId) {
        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", currentUser.getUsername()));

        Timer timer = timerRepository.findById(timerId)
                .orElseThrow(() -> new ResourceNotFoundException("Timer", "id", timerId));
        timer.stopTimer();
        timerRepository.save(timer);

        return new ResponseEntity(new ApiResponse(true, "Timer stop success!"),
                HttpStatus.OK);
    }

    @PostMapping("/resume/{timerId}")
    public ResponseEntity<?> resumeTimer(@CurrentUser UserPrincipal currentUser, @PathVariable(value = "timerId") Long timerId) {
        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", currentUser.getUsername()));

        user.endPreviousTimers();
        Timer oldTimer = timerRepository.findById(timerId)
                .orElseThrow(() -> new ResourceNotFoundException("Timer", "id", timerId));

        Timer newTimer = new Timer(oldTimer.getTitle());
        timerRepository.save(newTimer);

        Set<Timer> userTimers = user.getTimers();
        userTimers.add(newTimer);
        user.setTimers(userTimers);
        userRepository.save(user);

        return new ResponseEntity(new TimerCreateResponse(true, "Timer resume success!", new Date()),
                HttpStatus.OK);
    }

    @DeleteMapping("/delete/{timerId}")
    public ResponseEntity<?> deleteTimer(@CurrentUser UserPrincipal currentUser, @PathVariable(value = "timerId") Long timerId) {
        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", currentUser.getUsername()));

        Timer timer = timerRepository.findById(timerId)
                .orElseThrow(() -> new ResourceNotFoundException("Timer", "id", timerId));
        timer.stopTimer();
        timerRepository.delete(timer);

        Set<Timer> userTimers = user.getTimers();
        userTimers.remove(timer);
        user.setTimers(userTimers);
        userRepository.save(user);

        return new ResponseEntity(new ApiResponse(true, "Timer delete success!"),
                HttpStatus.OK);
    }

    @DeleteMapping("/delete/all")
    public ResponseEntity<?> deleteTimer(@CurrentUser UserPrincipal currentUser) {
        User user = userRepository.findByUsername(currentUser.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", currentUser.getUsername()));

        timerRepository.deleteAll();

        Set<Timer> userTimers = user.getTimers();
        userTimers.clear();
        user.setTimers(userTimers);
        userRepository.save(user);

        return new ResponseEntity(new ApiResponse(true, "Timer delete success!"),
                HttpStatus.OK);
    }
}
