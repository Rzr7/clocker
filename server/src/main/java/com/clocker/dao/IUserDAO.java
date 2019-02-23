package com.clocker.dao;

import com.clocker.entity.User;

import java.util.List;

public interface IUserDAO {
    List<User> getAllUsers();
    void addUser(User user);
    User getUserById(int id);
    User getUserByUsername(String username);
    void updateUser(User user);
    void deleteUser(int id);
    boolean userExists(String username, String email);
    boolean userExists(String username);
    String getUserAuthToken(Integer id);
}
