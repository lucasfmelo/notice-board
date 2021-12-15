package br.com.cers.noticeboard;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class NotFoundException extends Exception{

	public NotFoundException(String message) {
		super(message);
	}
	
	public NotFoundException(String message, Throwable t) {
		super(message, t);
	}
    
    
}
