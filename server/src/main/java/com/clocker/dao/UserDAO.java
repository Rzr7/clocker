package com.clocker.dao;

import com.clocker.entity.AuthUser;
import com.clocker.entity.User;
import com.clocker.entity.UserRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.List;

@Transactional
@Repository
public class UserDAO implements IUserDAO {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<User> getAllUsers() {
        String sql = "SELECT id, username, name, email FROM users";
        RowMapper<User> rowMapper = new UserRowMapper();
        return this.jdbcTemplate.query(sql, rowMapper);
    }

    @Override
    public void addUser(User user) {
        String sql = "INSERT INTO users " +
                "(username, name, email, password) " +
                "values (?, ?, ?, ?)";

        jdbcTemplate.update(
                sql,
                user.getUsername(),
                user.getName(),
                user.getEmail(),
                user.getPassword()
        );
    }

    @Override
    public User getUserById(int id) {
        String sql = "SELECT id, username, name, email " +
                "FROM users " +
                "WHERE id = ?";
        RowMapper<User> rowMapper = new BeanPropertyRowMapper<User>(User.class);
        User user = jdbcTemplate.queryForObject(sql, rowMapper, id);
        return user;
    }

    @Override
    public User getUserByUsername(String username) {
        String sql = "SELECT id, username, name, email, password " +
                "FROM users " +
                "WHERE username = ?";
        RowMapper<User> rowMapper = new BeanPropertyRowMapper<User>(User.class);
        User user = jdbcTemplate.queryForObject(sql, rowMapper, username);
        return user;
    }

    @Override
    public void updateUser(User user) {
        String sql = "UPDATE users " +
                "SET username=?, name=?, email=? " +
                "WHERE id=?";

        jdbcTemplate.update(
                sql,
                user.getUsername(),
                user.getName(),
                user.getEmail()
        );
    }

    @Override
    public void deleteUser(int id) {
        String sql = "DELETE " +
                "FROM users " +
                "WHERE id=?";
        jdbcTemplate.update(sql, id);
    }

    @Override
    public boolean userExists(String username, String email) {
        String sql = "SELECT count(*) " +
                "FROM users " +
                "WHERE username = ? or email=?";
        int count = jdbcTemplate.queryForObject(
                sql,
                Integer.class,
                username,
                email);
        if(count == 0) {
            return false;
        } else {
            return true;
        }
    }

    @Override
    public boolean authTokenExists(String token) {
        String sql = "SELECT count(*) " +
                "FROM users " +
                "WHERE authToken = ?";
        int count = jdbcTemplate.queryForObject(
                sql,
                Integer.class,
                token);
        if(count == 0) {
            return false;
        } else {
            return true;
        }
    }

    @Override
    public boolean userExists(String username) {
        String sql = "SELECT count(*) " +
                "FROM users " +
                "WHERE username = ?";
        int count = jdbcTemplate.queryForObject(
                sql,
                Integer.class,
                username
                );
        if(count == 0) {
            return false;
        } else {
            return true;
        }
    }

    @Override
    public String getUserAuthToken(Integer id) {
        User user = null;
        String sql = "SELECT authToken " +
                "FROM users " +
                "WHERE id = ?";
        RowMapper<User> rowMapper = new BeanPropertyRowMapper<User>(User.class);
        user = jdbcTemplate.queryForObject(sql, rowMapper, id);
        if(user != null) {
            return user.getAuthToken();
        }
        return null;
    }

    @Override
    public String getUserAuthTokenByUsername(String username) {
        User user = null;
        String sql = "SELECT authToken " +
                "FROM users " +
                "WHERE username = ?";
        RowMapper<User> rowMapper = new BeanPropertyRowMapper<User>(User.class);
        user = jdbcTemplate.queryForObject(sql, rowMapper, username);
        if(user != null) {
            return user.getAuthToken();
        }
        return null;
    }

    @Override
    public String generateUserToken(String username) {
        User user = null;
        String sql = "UPDATE users " +
                "SET authToken = ? " +
                "WHERE username = ?";
        RowMapper<User> rowMapper = new BeanPropertyRowMapper<User>(User.class);
        String authToken = this.generateSafeToken();
        jdbcTemplate.update(sql,
                authToken,
                username);

        return authToken;
    }


    @Override
    public AuthUser getUserByAuthToken(String token) {
        AuthUser user = null;
        if (token != null) {
            if (this.authTokenExists(token)) {
                String sql = "SELECT id, username, name, email " +
                        "FROM users " +
                        "WHERE authToken = ?";
                RowMapper<AuthUser> rowMapper = new BeanPropertyRowMapper<AuthUser>(AuthUser.class);
                user = jdbcTemplate.queryForObject(sql, rowMapper, token);
                if (user != null) {
                    return user;
                }
            }
        }
        return null;
    }

    private String generateSafeToken() {
        SecureRandom random = new SecureRandom();
        byte bytes[] = new byte[20];
        random.nextBytes(bytes);
        Base64.Encoder encoder = Base64.getUrlEncoder().withoutPadding();
        String token = encoder.encodeToString(bytes);
        return token;
    }
}
