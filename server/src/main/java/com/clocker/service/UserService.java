package com.clocker.service;

import com.clocker.dao.IUserDAO;
import com.clocker.entity.User;
import com.clocker.util.Password;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements IUserService {

    @Autowired
    private IUserDAO userDAO;

    @Override
    public User getUserById(int id) {
        User obj = userDAO.getUserById(id);
        return obj;
    }

    @Override
    public List<User> getAllUsers(){
        return userDAO.getAllUsers();
    }

    @Override
    public synchronized boolean addUser(User user){
        if (userDAO.userExists(user.getUsername(), user.getEmail())) {
            return false;
        } else {
            userDAO.addUser(user);
            return true;
        }
    }

    @Override
    public synchronized boolean authUser(User user){
        if (userDAO.userExists(user.getUsername())) {
            // if user exists check passwords
            User userModel = userDAO.getUserByUsername(user.getUsername());
            String inputPassword = user.getPassword();
            boolean checkPassword = Password.checkPassword(inputPassword, userModel.getPassword());
            if (checkPassword) {
                return true;
            }
        }
        return false;
    }

    @Override
    public User getUserByUsername(String username){
        if (userDAO.userExists(username)) {
            User obj = userDAO.getUserByUsername(username);
            return obj;
        } else {
            return null;
        }
    }

    @Override
    public boolean isUserAuthenticated(String token, Integer id){
        String authUserToken = userDAO.getUserAuthToken(id);
        if (token.equals(authUserToken)) {
            return true;
        }
        return false;
    }

    @Override
    public void updateUser(User user) {
        userDAO.updateUser(user);
    }

    @Override
    public void deleteUser(int id) {
        userDAO.deleteUser(id);
    }
}
