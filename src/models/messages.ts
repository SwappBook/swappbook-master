export interface ChatRoom{
    key?:string;
    comprador:string;
    producto:string;
    vendedor:string;
}

export interface ChatUserRooms{
    key?: string,
    value: string
}

export interface Message{
    key?:string;
    remitente:string;
    destinatario:string;
    message:string;
    date:Date;

}

export const snapshotToArray = snapshot => {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
};