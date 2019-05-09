package com.clocker.clocker.service;

import com.clocker.clocker.model.Timer;
import com.clocker.clocker.model.User;
import com.clocker.clocker.payload.SignUpRequest;
import com.clocker.clocker.security.UserPrincipal;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@RunWith(SpringJUnit4ClassRunner.class)
public class TimerServiceTest {

    @Autowired
    private TimerService timerService;

    @Autowired
    private UserService userService;

    @Test
    public void whenCreateTimer_thenTimerMustExists() {

        SignUpRequest testSignUp = new SignUpRequest();
        testSignUp.setUsername("testuser1");
        testSignUp.setPassword("testuser1");
        testSignUp.setEmail("test@test.ee");
        testSignUp.setName("Test User");

        User testUser = userService.newUser(testSignUp);

        Timer timer = new Timer();
        timerService.saveTimer(timer);

        Timer timer2 = new Timer();
        timerService.saveTimer(timer2);

        Set<Timer> userTimers = testUser.getTimers();
        userTimers.add(timer);
        testUser.setTimers(userTimers);
        userService.saveUser(testUser);

        assertThat(testUser.getTimers())
                .hasSize(1)
                .contains(timer)
                .doesNotContain(timer2);
    }

    @Test
    public void whenStopTimer_thenTimerMustStop() {

        SignUpRequest testSignUp = new SignUpRequest();
        testSignUp.setUsername("testuser1");
        testSignUp.setPassword("testuser1");
        testSignUp.setEmail("test@test.ee");
        testSignUp.setName("Test User");

        User testUser = userService.newUser(testSignUp);

        Timer timer = new Timer();
        timerService.saveTimer(timer);

        Set<Timer> userTimers = testUser.getTimers();
        userTimers.add(timer);
        testUser.setTimers(userTimers);
        userService.saveUser(testUser);

        Timer foundTimer = timerService.getTimerById(timer.getId());

        foundTimer.stopTimer();
        timerService.saveTimer(foundTimer);

        assertThat(timer.getId()).isEqualTo(foundTimer.getId());

        assertThat(foundTimer.getEndAt())
                .isNotNull();
    }
}
