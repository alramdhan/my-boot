package com.belajar.boot.DemoBoot.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class IndexController {
    @RequestMapping(value = "/", method = RequestMethod.GET)
	public ModelAndView root(HttpServletRequest request, HttpServletResponse response, RedirectAttributes redir) throws Exception {
        return doShowLogin("message", "");
	}

    private ModelAndView doShowLogin(String attributeName, String attributeValue) {
		ModelAndView mav = new ModelAndView();
		mav.addObject(attributeName, attributeValue);
		mav.setViewName("index");
		return mav;
	}
}
