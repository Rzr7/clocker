package com.clocker.service;

import com.clocker.entity.User;

import java.util.List;

public interface IUserService {
    List<User> getAllUsers();
    User getUserById(int id);
    boolean addUser(User user);
    void updateUser(User user);
    void deleteUser(int id);
    boolean authUser(User user);
    User getUserByUsername(String username);
    boolean isUserAuthenticated(String token, Integer id);
}
