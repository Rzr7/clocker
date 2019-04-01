package com.clocker.payload;

import java.time.Instant;

public class UserProfile {
    private Long id;
    private String username;
    private String name;
    private String avatar;
    private Instant joinedAt;

    public UserProfile(Long id, String username, String name, Instant joinedAt, String avatar) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.joinedAt = joinedAt;
        this.avatar = avatar;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getJoinedAt() {
        return joinedAt;
    }

    public void setJoinedAt(Instant joinedAt) {
        this.joinedAt = joinedAt;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
}