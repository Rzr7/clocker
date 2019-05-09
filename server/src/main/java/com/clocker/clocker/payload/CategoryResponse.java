package com.clocker.clocker.payload;

import com.clocker.clocker.model.Category;

public class CategoryResponse {
    private Long id;
    private Integer owner;
    private String title;


    public CategoryResponse(Category category) {
        this.id = category.getId();
        this.title = category.getTitle();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}