package org.malta.iam.workspace.controller.v1;

import java.security.Principal;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/workspaces")
public class WorkspaceController {


    @RequestMapping(value = "/recents", method = RequestMethod.GET)
    public List<WorkspaceResource> recents() {
        return null;
    }

    /**
     * Open workspace contents and add this workspace to recent list.
     *
     * @param id workspace id to open
     * @return
     */
    @RequestMapping(value = "/open", method = RequestMethod.PUT)
    public Object open(Long id) {
        return null;
    }
//
//    @RequestMapping(method = RequestMethod.GET)
//    // ou @PreAuthorize("#oauth2.hasScope('ui')")
//    @PreAuthorize("#oauth2.hasScope('hello.say')")
//    public String helloworld() {
//        Principal principal = SecurityContextHolder.getContext().getAuthentication();
//        System.out.println("PRINCIPAL: " + principal);
//        return "helloworld";
//    }
}
