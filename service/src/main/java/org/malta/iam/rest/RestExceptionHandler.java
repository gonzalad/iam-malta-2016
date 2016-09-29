package org.malta.iam.rest;

import org.malta.iam.utils.ResourceNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @author agonzalez
 */
@ControllerAdvice
public class RestExceptionHandler {
    private static final Logger logger = LoggerFactory.getLogger(RestExceptionHandler.class);

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ErrorResource handleResourceNotFoundException(ResourceNotFoundException e) {
        logger.debug(e.toString(), e);
        return new ErrorResource(HttpStatus.NOT_FOUND.value(), e.getMessage());
    }

    @ExceptionHandler(Exception.class)
    private ErrorResource produceErrorResource(Exception e) {
        logger.error(e.toString(), e);
        return new ErrorResource(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
    }

}
