import { createHeader } from "./js/createHeader.js";
import { createSectionClients } from "./js/createSectionClients.js";
import { callModal } from "./js/operationModalWindow.js";
import { createClient } from "./js/createClients.js";
import { searchAndSortingClients } from "./js/searchAndSortingClients.js";
import { linkToClient } from "./js/linkToClient.js";
import { searchParam } from "./js/api.js";
const params = searchParam();


createHeader();
createSectionClients();
linkToClient();
callModal();
if (!params) {
    createClient();
}
searchAndSortingClients();


