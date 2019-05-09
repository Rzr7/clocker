package com.clocker.clocker.controller;

import com.clocker.clocker.model.User;
import com.clocker.clocker.payload.*;
import com.clocker.clocker.security.CurrentUser;
import com.clocker.clocker.security.UserPrincipal;
import com.clocker.clocker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public UserSummary getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        User user = userService.getUserById(currentUser.getId());
        UserSummary userSummary = new UserSummary(user.getId(), user.getUsername(), user.getName(), user.getAvatar(), user.getEmail());
        return userSummary;
    }

    @PostMapping("/user/modifyProfile")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity updateUserProfile(@CurrentUser UserPrincipal currentUser,
                                            @RequestBody ProfileUpdateRequest profileUpdateRequest) {
        return userService.updateUserProfile(currentUser, profileUpdateRequest);
    }

    @GetMapping("/user/checkUsernameAvailability")
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "username") String username) {
        Boolean isAvailable = !userService.isUserExistsByUsername(username);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/user/checkEmailAvailability")
    public UserIdentityAvailability checkEmailAvailability(@RequestParam(value = "email") String email) {
        Boolean isAvailable = !userService.isUserExistsByEmail(email);
        return new UserIdentityAvailability(isAvailable);
    }

    @GetMapping("/users/{username}")
    public UserProfile getUserProfile(@PathVariable(value = "username") String username) {
        User user = userService.getUserByUsername(username);

        UserProfile userProfile = new UserProfile(user.getId(), user.getUsername(), user.getName(), user.getCreatedAt(), user.getAvatar());

        return userProfile;
    }
}
