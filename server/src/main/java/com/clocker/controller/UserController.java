package com.clocker.controller;

import com.clocker.entity.User;
import com.clocker.service.IUserService;
import com.clocker.util.Password;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("users")
public class UserController {
    @Autowired
    private IUserService userService;

    @GetMapping("user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Integer id) {
        User user = userService.getUserById(id);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @GetMapping("user")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> list = userService.getAllUsers();
        return new ResponseEntity<List<User>>(list, HttpStatus.OK);
    }

    @PostMapping("user")
    public ResponseEntity<Void> addUser(@RequestBody User user, UriComponentsBuilder builder) {

        // Generate hash for user password.
        String notHashedPassword = user.getPassword();
        String hashedPassword = Password.hashPassword(notHashedPassword);
        user.setPassword(hashedPassword);

        boolean flag = userService.addUser(user);
        if (flag == false) {
            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(builder.path("/user/{id}").buildAndExpand(user.getId()).toUri());
        return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
    }

    @PostMapping("auth")
    public ResponseEntity<String> authUser(@RequestBody User user, UriComponentsBuilder builder) {
        boolean response = userService.authUser(user);
        if (response == false) {
            return new ResponseEntity<String>("Invalid credentials", HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<String>("Auth success", HttpStatus.OK);
    }

    @GetMapping("isAuthenticated/{token}/{id}")
    public ResponseEntity<String> isUserAuthenticated(@PathVariable("token") String token, @PathVariable("id") Integer id) {
        boolean isAuth = userService.isUserAuthenticated(token, id);
        if (isAuth) {
            return new ResponseEntity<String>("Authenticated", HttpStatus.OK);
        }
        return new ResponseEntity<String>("Not Authenticated", HttpStatus.UNAUTHORIZED);
    }

    @PutMapping("user")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        userService.updateUser(user);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @DeleteMapping("user/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") Integer id) {
        userService.deleteUser(id);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }
}
