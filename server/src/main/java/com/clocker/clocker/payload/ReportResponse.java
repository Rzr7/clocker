package com.clocker.clocker.payload;

import java.util.HashMap;
import java.util.LinkedHashMap;

public class ReportResponse {
    private HashMap<String, Integer> reportResponse = new LinkedHashMap<String, Integer>();

    public HashMap<String, Integer> getReportResponse() {
        return reportResponse;
    }

    public void addToReport(String key, Integer value) {
        if (key == null) {
            key = "No Category";
        }
        if (this.reportResponse.containsKey(key)) {
            Integer newValue = this.reportResponse.get(key) + value;
            this.reportResponse.put(key, newValue);
        } else {
            this.reportResponse.put(key, value);
        }
    }
}
