package com.clocker.clocker.controller;

import com.clocker.clocker.payload.UserCategories;
import com.clocker.clocker.security.CurrentUser;
import com.clocker.clocker.security.UserPrincipal;
import com.clocker.clocker.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @GetMapping("/all")
    public UserCategories getAllCategories(@CurrentUser UserPrincipal currentUser) {
        return categoryService.getAll(currentUser.getId());
    }
}
