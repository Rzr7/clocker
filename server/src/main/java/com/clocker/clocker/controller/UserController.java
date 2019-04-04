package com.clocker.clocker.controller;

import com.clocker.clocker.exception.ResourceNotFoundException;
import com.clocker.clocker.model.User;
import com.clocker.clocker.payload.*;
import com.clocker.clocker.repository.UserRepository;
import com.clocker.clocker.security.CurrentUser;
import com.clocker.clocker.security.UserPrincipal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        User user = userRepository.findById(currentUser.getId()).orElseThrow(() -> new ResourceNotFoundException("User", "username", currentUser.getUsername()));
        UserSummary userSummary = new UserSummary(user.getId(), user.getUsername(), user.getName(), user.getAvatar(), user.getEmail());
        return userSummary;
    }

    @PostMapping("/user/modifyProfile")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity updateUserProfile(@CurrentUser UserPrincipal currentUser,
                                            @RequestBody ProfileUpdateRequest profileUpdateRequest) {
        User user = userRepository.findById(currentUser.getId()).orElseThrow(() -> new ResourceNotFoundException("User", "username", currentUser.getUsername()));

        if (!profileUpdateRequest.getEmail().isEmpty()) {
            if(userRepository.existsByEmail(profileUpdateRequest.getEmail()) && !currentUser.getEmail().equals(profileUpdateRequest.getEmail())) {
                return new ResponseEntity(new ApiResponse(false, "Email Address already in use!"),
                        HttpStatus.BAD_REQUEST);
            }
            user.setEmail(profileUpdateRequest.getEmail());
        }
        if (!profileUpdateRequest.getNew_password().isEmpty()) {
            if (!profileUpdateRequest.getNew_password().equals(profileUpdateRequest.getConfirm_password())) {
                return new ResponseEntity(new ApiResponse(false, "Passwords not equal!"),
                        HttpStatus.BAD_REQUEST);
            }
            user.setPassword(passwordEncoder.encode(profileUpdateRequest.getNew_password()));
        }
        if (!profileUpdateRequest.getName().isEmpty()) {
            user.setName(profileUpdateRequest.getName());
        }

        userRepository.save(user);

        return new ResponseEntity(new ApiResponse(true, "User data modified!"),
                HttpStatus.OK);
    }

    @GetMapping("/user/checkUsernameAvailability")
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
        Boolean isAvailable = !userRepository.existsByUsername(username);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/user/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userRepository.existsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/users/{username}")
    public UserProfile getUserProfile(@PathVariable(value = "username") String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        UserProfile userProfile = new UserProfile(user.getId(), user.getUsername(), user.getName(), user.getCreatedAt(), user.getAvatar());

        return userProfile;
    }
}
