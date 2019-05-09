package com.clocker.clocker.service;

import com.clocker.clocker.model.User;
import com.clocker.clocker.payload.ReportResponse;
import com.clocker.clocker.payload.TimerResponse;
import com.clocker.clocker.payload.UserTimers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReportService {

    @Autowired
    private UserService userService;

    public ReportResponse getYearReport(String username, String year) {
        User user = userService.getUserByUsername(username);
        UserTimers userTimers = new UserTimers(user.getTimers());
        ReportResponse reportResponse = new ReportResponse();
        for (TimerResponse timer:
                userTimers.getTimers()) {
            if (timer.getHoursDifference() != 0 && timer.getYear().equals(year)) {
                reportResponse.addToReport(String.valueOf(Integer.valueOf(timer.getMonth()) + 1), timer.getHoursDifference());
            }
        }
        return reportResponse;
    }

    public ReportResponse getMonthReport(String username, String month) {
        User user = userService.getUserByUsername(username);
        UserTimers userTimers = new UserTimers(user.getTimers());
        ReportResponse reportResponse = new ReportResponse();
        for (TimerResponse timer:
                userTimers.getTimers()) {
            if (timer.getHoursDifference() != 0 && timer.getMonth().equals(month)) {
                reportResponse.addToReport(timer.getDayOfMonth(), timer.getHoursDifference());
            }
        }
        return reportResponse;
    }

    public ReportResponse getWeekReport(String username, String week) {
        User user = userService.getUserByUsername(username);
        UserTimers userTimers = new UserTimers(user.getTimers());
        ReportResponse reportResponse = new ReportResponse();
        for (TimerResponse timer:
                userTimers.getTimers()) {
            if (timer.getHoursDifference() != 0 && timer.getWeekOfYear().equals(week)) {
                reportResponse.addToReport(timer.getDayOfWeek(), timer.getHoursDifference());
            }
        }
        return reportResponse;
    }

    public ReportResponse getYearCategoryReport(String username, String year) {
        User user = userService.getUserByUsername(username);
        UserTimers userTimers = new UserTimers(user.getTimers());
        ReportResponse reportResponse = new ReportResponse();
        for (TimerResponse timer:
                userTimers.getTimers()) {
            if (timer.getHoursDifference() != 0 && timer.getYear().equals(year)) {
                reportResponse.addToReport(timer.getCategory(), timer.getHoursDifference());
            }
        }
        return reportResponse;
    }

    public ReportResponse getMonthCategoryReport(String username, String month) {
        User user = userService.getUserByUsername(username);
        UserTimers userTimers = new UserTimers(user.getTimers());
        ReportResponse reportResponse = new ReportResponse();
        for (TimerResponse timer:
                userTimers.getTimers()) {
            if (timer.getHoursDifference() != 0 && timer.getMonth().equals(month)) {
                reportResponse.addToReport(timer.getCategory(), timer.getHoursDifference());
            }
        }
        return reportResponse;
    }

    public ReportResponse getWeekCategoryReport(String username, String week) {
        User user = userService.getUserByUsername(username);
        UserTimers userTimers = new UserTimers(user.getTimers());
        ReportResponse reportResponse = new ReportResponse();
        for (TimerResponse timer:
                userTimers.getTimers()) {
            if (timer.getHoursDifference() != 0 && timer.getWeekOfYear().equals(week)) {
                reportResponse.addToReport(timer.getCategory(), timer.getHoursDifference());
            }
        }
        return reportResponse;
    }
}
