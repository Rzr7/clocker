package com.clocker.clocker.service;

import com.clocker.clocker.exception.ResourceNotFoundException;
import com.clocker.clocker.model.Timer;
import com.clocker.clocker.model.User;
import com.clocker.clocker.payload.*;
import com.clocker.clocker.repository.TimerRepository;
import com.clocker.clocker.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Set;

@Service
public class TimerService {

    @Autowired
    private TimerRepository timerRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CategoryService categoryService;

    public boolean addTimer(User user) {
        user.endPreviousTimers();
        // Create timer
        Timer timer = new Timer();
        this.saveTimer(timer);

        //Add timer to current user
        Set<Timer> userTimers = user.getTimers();
        userTimers.add(timer);
        user.setTimers(userTimers);
        userService.saveUser(user);

        return true;
    }

    public boolean updateTitleTimer(UserPrincipal currentUser, Long timerId, TimerUpdateRequest timerUpdateRequest) {
        User user = userService.getUserByUsername(currentUser.getUsername());

        Timer timer = this.getTimerById(timerId);

        if (!user.isOwner(timer)) {
            return false;
        }
        timer.setTitle(timerUpdateRequest.getTitle());
        this.saveTimer(timer);

        return true;
    }

    public boolean updateTimerCategory(UserPrincipal currentUser, Long timerId, TimerCategoryUpdateRequest timerCategoryUpdateRequest) {
        User user = userService.getUserByUsername(currentUser.getUsername());

        Timer timer = this.getTimerById(timerId);

        if (!user.isOwner(timer)) {
            return false;
        }
        timer.setCategory(categoryService.getCategoryById(timerCategoryUpdateRequest.getCategory()));
        this.saveTimer(timer);

        return true;
    }

    public boolean stopTimer(UserPrincipal currentUser, Long timerId) {
        User user = userService.getUserByUsername(currentUser.getUsername());

        Timer timer = this.getTimerById(timerId);

        if (!user.isOwner(timer)) {
            return false;
        }

        timer.stopTimer();
        this.saveTimer(timer);

        return true;
    }

    public boolean resumeTimer(UserPrincipal currentUser, Long timerId) {
        User user = userService.getUserByUsername(currentUser.getUsername());

        user.endPreviousTimers();
        Timer oldTimer = this.getTimerById(timerId);

        if (!user.isOwner(oldTimer)) {
            return false;
        }

        Timer newTimer = new Timer(oldTimer.getTitle());
        this.saveTimer(newTimer);

        Set<Timer> userTimers = user.getTimers();
        userTimers.add(newTimer);
        user.setTimers(userTimers);
        userService.saveUser(user);

        return true;
    }

    public boolean timerUpdateTime(UserPrincipal currentUser, Long timerId, TimerUpdateEndTimeRequest timerUpdateEndTimeRequest) {
        Timer timer = this.getTimerById(timerId);

        User user = userService.getUserByUsername(currentUser.getUsername());

        if (!user.isOwner(timer)) {
            return false;
        }

        timer.stopTimer();
        timer.setStartAt(timerUpdateEndTimeRequest.getStart_time());
        timer.setEndAt(timerUpdateEndTimeRequest.getEnd_time());
        this.saveTimer(timer);

        return true;
    }

    public boolean stopAll(UserPrincipal currentUser) {
        User user = userService.getUserByUsername(currentUser.getUsername());

        user.endPreviousTimers();

        return true;
    }

    public boolean deleteTimer(UserPrincipal currentUser, Long timerId) {
        User user = userService.getUserByUsername(currentUser.getUsername());

        Timer timer = this.getTimerById(timerId);

        if (!user.isOwner(timer)) {
            return false;
        }

        timer.stopTimer();
        timerRepository.delete(timer);

        Set<Timer> userTimers = user.getTimers();
        userTimers.remove(timer);
        user.setTimers(userTimers);
        userService.saveUser(user);

        return true;
    }

    public boolean deleteTimer(UserPrincipal currentUser) {
        User user = userService.getUserByUsername(currentUser.getUsername());

        timerRepository.deleteAll();

        Set<Timer> userTimers = user.getTimers();
        userTimers.clear();
        user.setTimers(userTimers);
        userService.saveUser(user);

        return true;
    }

    public Timer getTimerById(Long timerId) {
        return timerRepository.findById(timerId)
                .orElseThrow(() -> new ResourceNotFoundException("Timer", "id", timerId));
    }

    public void saveTimer(Timer timer) {
        timerRepository.save(timer);
    }
}
