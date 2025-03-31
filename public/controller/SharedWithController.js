import { SharedWithModel } from "../model/SharedWithModel.js";
import { startSpinner,stopSpinner } from "../view/util.js";
import { getSharedWithPhotoNoteListFromFirestore } from "./firestore_controller.js";
import { currentUser } from "./firebase_auth.js";
export class SharedWithController{
    // instance members
    model = null;
    view = null;
    constructor(){
        this.model = new SharedWithModel();
        
    }

    setView(view){
        this.view = view;
    }

    async loadData() {
        // load sharedWith photnotes from Firestore
        startSpinner();
        try {
            const photoNoteList = await getSharedWithPhotoNoteListFromFirestore(currentUser.email);
            this.model.setSharedPhotoNoteList(photoNoteList);
            stopSpinner();
        } catch (e) {
            stopSpinner();
            console.log(e);
            this.model.setSharedPhotoNoteList([]);
            alert('Failed to load shared photnotes');
        }
    }
    
}