package com.clocker.clocker.model;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

class Model {
    private String table;


    HashMap<String, Optional> getDetails(HashMap<String, Optional> options) {
        HashMap<String, Optional> result = new HashMap<String, Optional>();

        for (Map.Entry<String, Optional> entry : result.entrySet()) {
            String key = entry.getKey();
            Optional value = entry.getValue();

        }

        return result;
    }
}
