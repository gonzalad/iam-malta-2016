package org.malta.iam.rest;

import java.io.Serializable;
import java.util.Arrays;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * @author agonzalez
 */
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class ErrorResource implements Serializable {

    private String status;

    private String detail;

    private String type;

    public ErrorResource() {
    }

    public ErrorResource(int statusCode, String message) {
        this(statusCode, message, null);
    }

    public ErrorResource(int statusCode, String message,
                         String type) {
        status = Integer.toString(statusCode);
        detail = message;
        this.type = type;
    }

    public String getStatus() {
        return status;
    }

    public String getDetail() {
        return detail;
    }

    public String getType() {
        return type;
    }
}
