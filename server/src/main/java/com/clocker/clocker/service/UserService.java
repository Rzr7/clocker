package com.clocker.clocker.service;

import com.clocker.clocker.exception.AppException;
import com.clocker.clocker.exception.ResourceNotFoundException;
import com.clocker.clocker.model.Role;
import com.clocker.clocker.model.RoleName;
import com.clocker.clocker.model.User;
import com.clocker.clocker.payload.ApiResponse;
import com.clocker.clocker.payload.ProfileUpdateRequest;
import com.clocker.clocker.payload.SignUpRequest;
import com.clocker.clocker.repository.RoleRepository;
import com.clocker.clocker.repository.UserRepository;
import com.clocker.clocker.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    public ResponseEntity<ApiResponse> updateUserProfile(UserPrincipal currentUser, ProfileUpdateRequest profileUpdateRequest) {
        User user = this.getUserById(currentUser.getId());

        if (!profileUpdateRequest.getEmail().isEmpty()) {
            if(userRepository.existsByEmail(profileUpdateRequest.getEmail()) && !currentUser.getEmail().equals(profileUpdateRequest.getEmail())) {
                return new ResponseEntity<>(new ApiResponse(false, "Email Address already in use!"),
                        HttpStatus.BAD_REQUEST);
            }
            user.setEmail(profileUpdateRequest.getEmail());
        }
        if (!profileUpdateRequest.getNew_password().isEmpty()) {
            if (!profileUpdateRequest.getNew_password().equals(profileUpdateRequest.getConfirm_password())) {
                return new ResponseEntity<>(new ApiResponse(false, "Passwords not equal!"),
                        HttpStatus.BAD_REQUEST);
            }
            user.setPassword(passwordEncoder.encode(profileUpdateRequest.getNew_password()));
        }
        if (!profileUpdateRequest.getName().isEmpty()) {
            user.setName(profileUpdateRequest.getName());
        }

        this.saveUser(user);

        return new ResponseEntity<>(new ApiResponse(true, "User data modified!"),
                HttpStatus.OK);
    }

    public User getUserByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        return user;
    }

    public User getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));

        return user;
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }

    public boolean isUserExistsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public boolean isUserExistsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public User newUser(SignUpRequest signUpRequest) {
        User user = new User(signUpRequest.getName(), signUpRequest.getUsername(),
                signUpRequest.getEmail(), signUpRequest.getPassword());

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new AppException("User Role not set."));

        user.setRoles(Collections.singleton(userRole));

        this.saveUser(user);

        return user;
    }
}
