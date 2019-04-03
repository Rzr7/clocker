package com.clocker.model;

import com.clocker.model.audit.TimerDateAudit;
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

    public Timer() {
        this.title = "New Timer";
        this.setStart_at(new Date());
    }

    public Timer(String title) {
        this.title = title;
        this.setStart_at(new Date());
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
        if (this.getEnd_at() == null) {
            this.setEnd_at(new Date());
        }
    }

}
