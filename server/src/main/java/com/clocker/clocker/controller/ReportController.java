package com.clocker.clocker.controller;

import com.clocker.clocker.payload.ReportResponse;
import com.clocker.clocker.security.CurrentUser;
import com.clocker.clocker.security.UserPrincipal;
import com.clocker.clocker.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;

@RestController
@RequestMapping("/api/report")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping("/date/curYear")
    public ReportResponse getCurrentYearReport(@CurrentUser UserPrincipal currentUser) {
        Calendar cal = Calendar.getInstance();
        String curYear = String.valueOf(cal.get(Calendar.YEAR));
        return reportService.getYearReport(currentUser.getUsername(), curYear);
    }

    @GetMapping("/date/prevYear")
    public ReportResponse getPrevYearReport(@CurrentUser UserPrincipal currentUser) {
        Calendar cal = Calendar.getInstance();
        String prevYear = String.valueOf(cal.get(Calendar.YEAR) - 1);
        return reportService.getYearReport(currentUser.getUsername(), prevYear);
    }

    @GetMapping("/date/curMonth")
    public ReportResponse getCurrentMonthReport(@CurrentUser UserPrincipal currentUser) {
        Calendar cal = Calendar.getInstance();
        String curMonth = String.valueOf(cal.get(Calendar.MONTH));
        return reportService.getMonthReport(currentUser.getUsername(), curMonth);
    }

    @GetMapping("/date/prevMonth")
    public ReportResponse getPrevMonthReport(@CurrentUser UserPrincipal currentUser) {
        Calendar cal = Calendar.getInstance();
        Integer prevMonthNumber = cal.get(Calendar.MONTH) - 1;
        String prevMonth = "12";
        if (prevMonthNumber != 0) {
            prevMonth = String.valueOf(prevMonthNumber);
        }

        return reportService.getMonthReport(currentUser.getUsername(), prevMonth);
    }

    @GetMapping("/date/curWeek")
    public ReportResponse getCurrentWeekReport(@CurrentUser UserPrincipal currentUser) {
        Calendar cal = Calendar.getInstance();
        String curWeek = String.valueOf(cal.get(Calendar.WEEK_OF_YEAR));
        return reportService.getWeekReport(currentUser.getUsername(), curWeek);
    }

    @GetMapping("/date/prevWeek")
    public ReportResponse getPrevWeekReport(@CurrentUser UserPrincipal currentUser) {
        Calendar cal = Calendar.getInstance();
        String curWeek = String.valueOf(cal.get(Calendar.WEEK_OF_YEAR) - 1);
        return reportService.getWeekReport(currentUser.getUsername(), curWeek);
    }


    @GetMapping("/category/curYear")
    public ReportResponse getCurrentYearCategoryReport(@CurrentUser UserPrincipal currentUser) {
        Calendar cal = Calendar.getInstance();
        String curYear = String.valueOf(cal.get(Calendar.YEAR));
        return reportService.getYearCategoryReport(currentUser.getUsername(), curYear);
    }

    @GetMapping("/category/prevYear")
    public ReportResponse getPrevYearCategoryReport(@CurrentUser UserPrincipal currentUser) {
        Calendar cal = Calendar.getInstance();
        String prevYear = String.valueOf(cal.get(Calendar.YEAR) - 1);
        return reportService.getYearCategoryReport(currentUser.getUsername(), prevYear);
    }

    @GetMapping("/category/curMonth")
    public ReportResponse getCurrentMonthCategoryReport(@CurrentUser UserPrincipal currentUser) {
        Calendar cal = Calendar.getInstance();
        String curMonth = String.valueOf(cal.get(Calendar.MONTH));
        return reportService.getMonthCategoryReport(currentUser.getUsername(), curMonth);
    }

    @GetMapping("/category/prevMonth")
    public ReportResponse getPrevMonthCategoryReport(@CurrentUser UserPrincipal currentUser) {
        Calendar cal = Calendar.getInstance();
        Integer prevMonthNumber = cal.get(Calendar.MONTH) - 1;
        String prevMonth = "12";
        if (prevMonthNumber != 0) {
            prevMonth = String.valueOf(prevMonthNumber);
        }

        return reportService.getMonthCategoryReport(currentUser.getUsername(), prevMonth);
    }

    @GetMapping("/category/curWeek")
    public ReportResponse getCurrentWeekCategoryReport(@CurrentUser UserPrincipal currentUser) {
        Calendar cal = Calendar.getInstance();
        String curWeek = String.valueOf(cal.get(Calendar.WEEK_OF_YEAR));
        return reportService.getWeekCategoryReport(currentUser.getUsername(), curWeek);
    }

    @GetMapping("/category/prevWeek")
    public ReportResponse getPrevWeekCategoryReport(@CurrentUser UserPrincipal currentUser) {
        Calendar cal = Calendar.getInstance();
        String curWeek = String.valueOf(cal.get(Calendar.WEEK_OF_YEAR) - 1);
        return reportService.getWeekCategoryReport(currentUser.getUsername(), curWeek);
    }


}

