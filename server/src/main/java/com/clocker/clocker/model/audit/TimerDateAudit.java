package com.clocker.clocker.model.audit;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(
        value = {"startAt", "endAt"},
        allowGetters = true
)
public abstract class TimerDateAudit implements Serializable {

    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private Date startAt;

    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    private Date endAt;

    public Date getStartAt() {
        return startAt;
    }

    public void setStartAt(Date startAt) {
        this.startAt = startAt;
    }

    public Date getEndAt() {
        return endAt;
    }

    public void setEndAt(Date endAt) {
        this.endAt = endAt;
    }
}