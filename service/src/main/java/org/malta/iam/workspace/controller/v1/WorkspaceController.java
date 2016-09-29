package org.malta.iam.workspace.controller.v1;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.malta.iam.utils.ResourceNotFoundException;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/workspaces/v1")
public class WorkspaceController {
    private List<WorkspaceResource> workspaces;

    public WorkspaceController() {
        workspaces = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            WorkspaceResource workspace = new WorkspaceResource();
            workspace.setId((long) i);
            workspace.setName("Workspace " + i);
            workspace.setDescription("Mon joli workspace " + i);
            workspaces.add(workspace);
        }
    }

    @RequestMapping(method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public List<WorkspaceResource> find(@RequestParam(required = false) String name) {
        return workspaces.stream().filter(workspace -> name != null ? workspace.getName().contains(name) : true).collect(Collectors.toList());
    }

    @RequestMapping(value = "/recents", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public List<WorkspaceResource> recents() {
        return workspaces.subList(0, 3);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public WorkspaceResource find(@PathVariable Long id) {
        return workspaces.stream().filter(workspace -> workspace.getId() == id).findAny()
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Workspace %s not found", id)));
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
