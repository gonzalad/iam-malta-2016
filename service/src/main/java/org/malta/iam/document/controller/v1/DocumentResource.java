package org.malta.iam.document.controller.v1;

import java.io.Serializable;

import org.malta.iam.rest.ResourceSupport;
import org.malta.iam.workspace.controller.v1.WorkspaceResource;

/**
 * @author agonzalez
 */
public class DocumentResource extends ResourceSupport {
    private Long id;
    private String name;
    private String schema;
    private String path;
    private WorkspaceResource workspaceResource;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSchema() {
        return schema;
    }

    public void setSchema(String schema) {
        this.schema = schema;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public WorkspaceResource getWorkspaceResource() {
        return workspaceResource;
    }

    public void setWorkspaceResource(WorkspaceResource workspaceResource) {
        this.workspaceResource = workspaceResource;
    }
}
