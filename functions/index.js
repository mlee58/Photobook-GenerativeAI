const {onCall, HttpsError} = require("firebase-functions/v2/https");


const API_KEY = "AIzaSyCWhBYWzP1I-nFx-J--aOA3d2uRmd6Kvts";

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

exports.cloudFnGetImageDescription = onCall(cloudFnGetImageDescription);
async function cloudFnGetImageDescription(request){
    // call gemini api to extract image information
    //CHECK FOR AUTHENTICATION
    if(!request.auth){
        throw new HttpsError('unauthenticated', 'You must be authenticated to use this function');
    }
    const imageURL = request.data;
    // //CONSOLE => TERMINAL OF vscode
    // console.log('cloud function: getImageDescription', imageURL);
    if(!imageURL){
        console.error('No image URL provided');
        throw new HttpsError('invalid-argument', 'You must provide an image URL');
    }

    try{
        const image = await fetch(imageURL);
        const imageBuffer = await image.arrayBuffer();
        const imageBufferData = Buffer.from(imageBuffer).toString('base64');
        const result = await model.generateContent([
            {
                inlineData: {data: imageBufferData, mimeType: "image/*"},
            },
            "Describe the image under 100 words",
        ]);
        console.log(result.response.text());
        return result.response.text();
    }catch(e){
        console.error('Error generating image description by Gemini', e);
        throw new HttpsError('internal', 'Error generating image description by Gemini');
    }
}