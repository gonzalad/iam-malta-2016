package org.malta.iam.workspace.controller.v1;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.malta.iam.utils.ResourceNotFoundException;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import static org.springframework.security.oauth2.provider.expression.OAuth2ExpressionUtils.hasAnyScope;

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
    public List<WorkspaceResource> find(@RequestParam(required = false) String name, Authentication authentication) {
        return workspaces.stream().filter(workspace -> name != null ? workspace.getName().contains(name) : true).map(wks ->
                addPermissions(wks, authentication)
        ).collect(Collectors.toList());
    }

    @RequestMapping(value = "/recents", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public List<WorkspaceResource> recents() {
        return workspaces.subList(0, 3);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public WorkspaceResource view(@PathVariable Long id, Authentication authentication) {
        WorkspaceResource workspace = workspaces.stream().filter(wks -> wks.getId() == id).findAny()
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Workspace %s not found", id)));
        addPermissions(workspace, authentication);
        return workspace;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT, produces = {MediaType.APPLICATION_JSON_VALUE})
    @PreAuthorize("#oauth2.hasScope('workspace.edit')")
    public WorkspaceResource update(Long id, WorkspaceResource workspaceResource, Authentication authentication) {
        return addPermissions(workspaceResource, authentication);
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

    /**
     * Add update / delete permissions depending on the end-user roles
     */
    private WorkspaceResource addPermissions(WorkspaceResource workspaceResource, Authentication authentication) {
        workspaceResource.addViewPermission();
        if (hasAnyScope(authentication, new String[]{"workspace.edit"})) {
            workspaceResource.addDeletePermission();
            workspaceResource.addUpdatePermission();
        }
        return workspaceResource;
    }
}
