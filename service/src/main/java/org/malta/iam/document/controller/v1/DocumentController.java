package org.malta.iam.document.controller.v1;

import java.util.ArrayList;
import java.util.List;

import org.malta.iam.workspace.controller.v1.WorkspaceResource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author agonzalez
 */
@RestController
@RequestMapping(value = "/documents/v1")
public class DocumentController {
    private List<DocumentResource> recentDocuments;

    public DocumentController() {
        WorkspaceResource workspace = new WorkspaceResource();
        workspace.setId(1L);
        workspace.setName("Workspace 1");
        workspace.setDescription("Mon joli workspace 1");
        recentDocuments = new ArrayList<>();
        for (int i = 0; i < 3; i++) {
            DocumentResource document = new DocumentResource();
            document.setId((long) i);
            document.setName("Document " + i);
            document.setPath("org/malta/kilkenny/my-tds-" + i + ".tds.json");
            document.setSchema("http://malta.org/process-flow/v1");
            document.setWorkspaceResource(workspace);
            recentDocuments.add(document);
        }
    }

    @RequestMapping(value = "/recents", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public List<DocumentResource> recents() {
        return recentDocuments;
    }
}
