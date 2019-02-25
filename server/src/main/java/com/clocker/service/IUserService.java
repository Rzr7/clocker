package com.clocker.service;

import com.clocker.entity.Auth;
import com.clocker.entity.LoginForm;
import com.clocker.entity.User;

import java.util.List;

public interface IUserService {
    List<User> getAllUsers();
    User getUserById(int id);
    boolean addUser(User user);
    void updateUser(User user);
    void deleteUser(int id);
    boolean authUser(LoginForm user);
    User getUserByUsername(String username);
    String getUserToken(LoginForm login);
    String getUserToken(User user);
    String generateUserToken(User user);
    String generateUserToken(LoginForm user);
    boolean isUserAuthenticated(Auth token);
}
