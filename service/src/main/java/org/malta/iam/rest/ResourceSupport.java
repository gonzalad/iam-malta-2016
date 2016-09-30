package org.malta.iam.rest;

import java.io.Serializable;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * @author agonzalez
 */
public class ResourceSupport implements Serializable {
    private Map<String,Boolean> permissions = new HashMap<String,Boolean>();

    public void addViewPermission() {
        permissions.put("view", true);
    }

    public void addUpdatePermission() {
        permissions.put("update", true);
    }

    public void addCreatePermission() {
        permissions.put("create", true);
    }

    public void addDeletePermission() {
        permissions.put("delete", true);
    }

    public void addPermission(String permission) {
        permissions.put(permission, true);
    }

    public void addAllModifiablePermission() {
        addUpdatePermission();
        addDeletePermission();
    }

    public Map<String,Boolean> getPermissions() {
        return permissions;
    }

    public void setPermissions(Map<String,Boolean> permissions) {
        this.permissions = permissions;
    }
}
