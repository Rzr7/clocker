package com.clocker.clocker.model;

import com.clocker.clocker.model.audit.TimerDateAudit;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
@Table(name = "timers")
public class Timer extends TimerDateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 40)
    private String title;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinTable(name = "timers_categories",
            joinColumns = @JoinColumn(name = "timer_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    private Category category;

    public Timer() {
        this.title = "New Timer";
        this.setStartAt(new Date());
    }

    public Timer(String title) {
        this.title = title;
        this.setStartAt(new Date());
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

    public void stopTimer() {
        if (this.getEndAt() == null) {
            this.setEndAt(new Date());
        }
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
