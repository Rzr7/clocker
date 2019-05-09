package com.clocker.clocker.model;

import com.clocker.clocker.model.audit.DateAudit;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.*;
import java.util.stream.Collectors;

@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "username"
        }),
        @UniqueConstraint(columnNames = {
                "email"
        })
})
public class User extends DateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 40)
    private String name;

    @NotBlank
    @Size(max = 15)
    private String username;

    @NotBlank
    @Size(max = 40)
    @Email
    private String email;

    @NotBlank
    @Size(max = 100)
    private String password;

    private String avatar;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_timers",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "timer_id"))
    private Set<Timer> timers = new HashSet<>();

    @OneToMany(mappedBy = "owner", fetch = FetchType.EAGER)
    private Set<Category> categories = new HashSet<>();

    public User() {

    }

    public User(String name, String username, String email, String password) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public User(String name, String username, String email, String password, String avatar) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public Set<Timer> getTimers() {
        return timers;
    }

    public Integer getNumberOfPages() {
        return Math.round(timers.size() / 15);
    }

    public Set<Timer> getTimers(Integer page) {
        page = page - 1;
        Integer startObject = page * 15;
        List<Timer> sortedList = timers.stream().sorted(Comparator.comparing(Timer::getId).reversed()).collect(Collectors.toList());
        Set<Timer> timersList = new HashSet<Timer>();
        for (Integer i = 0; i < (startObject + 15); i++) {
            if (i < startObject) {
                continue;
            }
            if (i < timers.size()) {
                timersList.add(sortedList.get(i));
            }
        }
        return timersList;
    }

    public boolean isOwner(Timer timer) {
        return timers.contains(timer);
    }

    public void setTimers(Set<Timer> timers) {
        this.timers = timers;
    }

    public void endPreviousTimers() {
        Date end_date = new Date();
        for (Timer timer:
             this.timers) {
            if (timer.getEndAt() == null) {
                timer.setEndAt(end_date);
            }
        }
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }
}
