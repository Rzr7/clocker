package com.clocker.clocker.payload;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class TimerCategoryUpdateRequest {
    @NotBlank
    @Size(min = 1, max = 40)
    private Long category;

    public Long getCategory() {
        return category;
    }

    public void setCategory(Long category) {
        this.category = category;
    }
}
