export class PhotoNote{
    // instance variables
    caption; description; uid; createdBy;
    imageName; imageURL; timestamp; sharedWith; docId;

    constructor(data){
        if(!data) return;
        this.caption = data.caption;
        this.description = data.description;
        this.uid = data.uid;
        this.createdBy = data.createdBy;
        this.imageName = data.imageName;
        this.imageURL = data.imageURL;
        this.timestamp = data.timestamp;
        this.sharedWith = data['sharedWith'] || [];

    }
    set_docId(id){
        this.docId = id;
    }

    toFirestore(){
        return{
            caption: this.caption,
            description: this.description,
            uid: this.uid,
            createBy: this.createdBy,
            imageName: this.imageURL,
            imageURL: this.imageURL,
            timestamp: this.timestamp,
            sharedWith: this.sharedWith,
        };
    }

    static parseSharedWith(value){
        if(!value) return [];
        const str = value.trim();
        const emailList = str.split(/[,|;| ]/).map(e=>e.trim())
                                                .filter(e =>e.length>0);
        return emailList;
    }

    static validateSharedWith(value){
        const str = value.trim();
        if(str.length === 0) return '';
        const emailList = PhotoNote.parseSharedWith(str);
        let invalidMessage = '';
        for(let i = 0; i < emailList.length; i++){
            // NN@uco.com ==> valid email
            if (!/^[0-9]+@uco.com$/.test(emailList[i])){
                invalidMessage += `${emailList[i]} `;
            }
        }
        return invalidMessage.trim();
    }
}