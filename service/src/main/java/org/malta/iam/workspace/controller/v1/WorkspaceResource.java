package org.malta.iam.workspace.controller.v1;

import java.io.Serializable;

/**
 * @author agonzalez
 */
public class WorkspaceResource implements Serializable {
    private Long id;
    private String name;
    private String description;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
