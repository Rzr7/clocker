package com.clocker.clocker.service;

import com.clocker.clocker.exception.AppException;
import com.clocker.clocker.model.Category;
import com.clocker.clocker.model.User;
import com.clocker.clocker.payload.UserCategories;
import com.clocker.clocker.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    UserService userService;

    public UserCategories getAll(Long userId) {
        User user = userService.getUserById(userId);
        UserCategories userCategories = new UserCategories(user.getCategories());
        return userCategories;
    }

    public Category getCategoryById(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new AppException("Category not found"));
        return category;
    }

}
