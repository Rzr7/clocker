package com.clocker.clocker.payload;

import com.clocker.clocker.model.Category;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class UserCategories {
    private Set<Category> categories;

    public UserCategories(Set<Category> categories) {
        this.categories = categories;
    }

    public List<CategoryResponse> getCategories() {
        List<Category> sortedList = categories.stream().sorted(Comparator.comparing(Category::getId).reversed()).collect(Collectors.toList());
        List<CategoryResponse> responseCategories = new ArrayList<CategoryResponse>();
        for (Category category:
                sortedList) {
            CategoryResponse categoryResponse = new CategoryResponse(category);
            responseCategories.add(categoryResponse);
        }
        return responseCategories;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }
}
